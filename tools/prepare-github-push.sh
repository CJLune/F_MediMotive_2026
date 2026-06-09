#!/bin/sh
# Strip oversized paths from git history so GitHub Desktop can push.
# Root cause: files >100MB and ~1GB .git folder cause "remote disconnected".
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LOG="$ROOT/.cursor/debug-a9426f.log"
TS=$(python3 -c 'import time; print(int(time.time()*1000))' 2>/dev/null || date +%s000)

log_json() {
  msg="$1"
  hid="$2"
  data="$3"
  mkdir -p "$ROOT/.cursor" 2>/dev/null || true
  printf '{"sessionId":"a9426f","hypothesisId":"%s","location":"prepare-github-push.sh","message":"%s","data":%s,"timestamp":%s,"runId":"pre-fix"}\n' \
    "$hid" "$msg" "$data" "$TS" >> "$LOG" 2>/dev/null || true
}

cd "$ROOT"

GIT_MB=$(du -sm .git 2>/dev/null | awk '{print $1}')
WORK_MB=$(du -sm . 2>/dev/null | awk '{print $1}')
OVER100=$(git rev-list --objects --all 2>/dev/null | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' 2>/dev/null | awk '/^blob/ && $3>104857600 {print $3,$4}' | wc -l | tr -d ' ')
log_json "repo size before cleanup" "H1" "{\"gitFolderMB\":\"$GIT_MB\",\"workTreeMB\":\"$WORK_MB\",\"blobsOver100MB\":\"$OVER100\"}"

if [ "$OVER100" != "0" ] && [ -n "$OVER100" ]; then
  git rev-list --objects --all 2>/dev/null | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' 2>/dev/null | awk '/^blob/ && $3>104857600 {printf "%.0fMB %s\n", $3/1048576, $4}' | head -5 | while read line; do
    log_json "oversized blob" "H1" "{\"file\":\"$line\"}"
  done
fi

echo "=== MediMotive GitHub push prep ==="
echo "Before: .git ≈ ${GIT_MB}MB, oversized blobs: ${OVER100}"
echo ""

if git show-ref --verify --quiet refs/heads/backup-before-github-clean; then
  echo "Backup branch already exists: backup-before-github-clean"
else
  git branch backup-before-github-clean
  echo "Saved backup branch: backup-before-github-clean"
fi

CURRENT=$(git branch --show-current)
git checkout --orphan github-clean-main
git add -A
git status --short | head -5
FILE_COUNT=$(git diff --cached --name-only | wc -l | tr -d ' ')
CACHED_MB=$(git diff --cached --name-only | xargs du -ch 2>/dev/null | tail -1 | awk '{print $1}')
log_json "orphan staging" "H2" "{\"trackedFiles\":\"$FILE_COUNT\",\"stagedSize\":\"${CACHED_MB:-unknown}\"}"

git commit -m "$(cat <<'EOF'
MediMotive site — GitHub-safe bundle

Exclude local-only paths (.playwright-browsers, archive, large media)
so push stays under GitHub file-size limits.
EOF
)"

git branch -D "$CURRENT" 2>/dev/null || true
git branch -m main

git reflog expire --expire=now --all 2>/dev/null || true
git gc --prune=now --aggressive 2>/dev/null || true

GIT_MB_AFTER=$(du -sm .git 2>/dev/null | awk '{print $1}')
log_json "repo size after cleanup" "H2" "{\"gitFolderMB\":\"$GIT_MB_AFTER\"}"

echo ""
echo "After:  .git ≈ ${GIT_MB_AFTER}MB"
echo "Done. In GitHub Desktop: Repository → Push origin"
echo "Backup of old history: git checkout backup-before-github-clean"
