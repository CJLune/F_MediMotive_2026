#!/bin/sh
# Remove GitHub-blocked paths from git and verify before push.
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

count_over100() {
  git ls-tree -r -l HEAD 2>/dev/null | awk '$4>104857600 {c++} END{print c+0}'
}

largest_mb() {
  git ls-tree -r -l HEAD 2>/dev/null | awk '{if($4>m)m=$4} END{printf "%.0f", m/1048576}'
}

cd "$ROOT"

BEFORE_GIT_MB=$(du -sm .git | awk '{print $1}')
BEFORE_OVER=$(count_over100)

echo "=== GitHub push fix ==="
echo "Before: .git ${BEFORE_GIT_MB}MB, files over 100MB: ${BEFORE_OVER}"
echo ""

grep -q '^\.playwright-browsers/' .gitignore || echo '.playwright-browsers/' >> .gitignore
grep -q '^archive/' .gitignore || echo 'archive/' >> .gitignore
grep -q '^assets/images/Journey/' .gitignore || echo 'assets/images/Journey/' >> .gitignore

git rm -r --cached --ignore-unmatch .playwright-browsers archive assets/images/Journey .cursor 2>/dev/null || true

git add .gitignore
if git diff --cached --quiet && [ "$(count_over100)" != "0" ]; then
  echo "ERROR: oversized files still tracked."
  git ls-tree -r -l HEAD | awk '$4>104857600 {printf "  %.0fMB %s\n", $4/1048576, $5}'
  exit 1
fi

if ! git diff --cached --quiet; then
  git commit --amend -m "$(cat <<'EOF'
MediMotive site — GitHub-safe bundle

Excludes local-only paths (.playwright-browsers, archive, Journey media)
so push stays under GitHub 100MB file limit.
EOF
)"
fi

AFTER_OVER=$(count_over100)
LARGEST=$(largest_mb)
if [ "$AFTER_OVER" != "0" ]; then
  echo "ERROR: still ${AFTER_OVER} file(s) over 100MB. Push would fail."
  git ls-tree -r -l HEAD | awk '$4>104857600 {printf "  %.0fMB %s\n", $4/1048576, $5}'
  exit 1
fi

git branch -D backup-before-github-clean 2>/dev/null || true
git reflog expire --expire=now --all 2>/dev/null || true
git gc --prune=now --aggressive 2>/dev/null || true

AFTER_GIT_MB=$(du -sm .git | awk '{print $1}')
TRACKED=$(git ls-files | wc -l | tr -d ' ')

echo "After:  .git ${AFTER_GIT_MB}MB, largest file ${LARGEST}MB, ${TRACKED} tracked files"
echo "OK — open GitHub Desktop and click Push origin."
