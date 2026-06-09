#!/bin/sh
# Push to GitHub bypassing Cursor's broken GIT_ASKPASS (401).
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

unset GIT_ASKPASS
unset SSH_ASKPASS
unset VSCODE_GIT_ASKPASS_NODE
unset VSCODE_GIT_ASKPASS_MAIN
unset VSCODE_GIT_ASKPASS_EXTRA_ARGS
export GIT_TERMINAL_PROMPT=1

sh "$ROOT/tools/reset-github-credentials.sh" || true

REMOTE=$(git remote get-url origin)
BRANCH=$(git branch --show-current)

echo ""
echo "Pushing to $REMOTE (branch: $BRANCH)..."
echo "If prompted:"
echo "  Username: CJLune"
echo "  Password: your GitHub PAT (ghp_...) — NOT your GitHub account password"
echo "  Create token: https://github.com/settings/tokens (classic, scope: repo)"
echo ""

git push -u origin "$BRANCH"
