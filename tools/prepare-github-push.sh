#!/bin/sh
# Remove GitHub-blocked paths from git and verify before push.
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LOG="$ROOT/.cursor/debug-a9426f.log"
TS=$(python3 -c 'import time; print(int(time.time()*1000))' 2>/dev/null || date +%s000)

log_json() {
  msg="$1"
  hid="$2"
  data="$3"
  mkdir -p "$ROOT/.cursor" 2>/dev/null || true
  printf '{"sessionId":"a9426f","hypothesisId":"%s","location":"prepare-github-push.sh","message":"%s","data":%s,"timestamp":%s,"runId":"fix-v2"}\n' \
    "$hid" "$msg" "$data" "$TS" >> "$LOG" 2>/dev/null || true
}

count_over100() {
  git ls-tree -r -l HEAD 2>/dev/null | awk '$4>104857600 {c++} END{print c+0}'
}

largest_mb() {
  git ls-tree -r -l HEAD 2>/dev/null | awk '{if($4>m)m=$4} END{printf "%.0f", m/1048576}'
}

cd "$ROOT"

BEFORE_GIT_MB=$(du -sm .git | awk '{print $1}')
BEFORE_OVER=$(count_over100)
log_json "before" "H1" "{\"gitFolderMB\":\"$BEFORE_GIT_MB\",\"filesOver100MB\":\"$BEFORE_OVER\"}"

echo "=== GitHub push fix (v2) ==="
echo "Before: .git ${BEFORE_GIT_MB}MB, files over 100MB: ${BEFORE_OVER}"
echo ""

# Ensure excludes exist
grep -q '^\.playwright-browsers/' .gitignore || echo '.playwright-browsers/' >> .gitignore
grep -q '^archive/' .gitignore || echo 'archive/' >> .gitignore
grep -q '^assets/images/Journey/' .gitignore || echo 'assets/images/Journey/' >> .gitignore

# Drop bloated paths from the index (files stay on disk)
git rm -r --cached --ignore-unmatch .playwright-browsers archive assets/images/Journey .cursor 2>/dev/null || true

git add .gitignore
if git diff --cached --quiet && [ "$(count_over100)" != "0" ]; then
  echo "ERROR: oversized files still tracked. Contact support."
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
  log_json "verify failed" "H1" "{\"filesOver100MB\":\"$AFTER_OVER\",\"largestMB\":\"$LARGEST\"}"
  echo "ERROR: still ${AFTER_OVER} file(s) over 100MB. Push would fail."
  git ls-tree -r -l HEAD | awk '$4>104857600 {printf "  %.0fMB %s\n", $4/1048576, $5}'
  exit 1
fi

git branch -D backup-before-github-clean 2>/dev/null || true
git reflog expire --expire=now --all 2>/dev/null || true
git gc --prune=now --aggressive 2>/dev/null || true

AFTER_GIT_MB=$(du -sm .git | awk '{print $1}')
TRACKED=$(git ls-files | wc -l | tr -d ' ')
log_json "after" "H2" "{\"gitFolderMB\":\"$AFTER_GIT_MB\",\"filesOver100MB\":\"0\",\"largestMB\":\"$LARGEST\",\"trackedFiles\":\"$TRACKED\"}"

echo "After:  .git ${AFTER_GIT_MB}MB, largest file ${LARGEST}MB, ${TRACKED} tracked files"
echo "OK — open GitHub Desktop and click Push origin."
