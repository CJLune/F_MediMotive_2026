#!/bin/sh
# One-time SSH setup for GitHub push (alternative to HTTPS + PAT).
# After running: add the printed public key at https://github.com/settings/ssh/new
set -e
KEY="$HOME/.ssh/id_ed25519_github"
EMAIL="${1:-111456675+CJLune@users.noreply.github.com}"

mkdir -p "$HOME/.ssh"
chmod 700 "$HOME/.ssh"

if [ ! -f "$KEY" ]; then
  ssh-keygen -t ed25519 -C "$EMAIL" -f "$KEY" -N ""
  echo "Created $KEY"
else
  echo "Key already exists: $KEY"
fi

# GitHub host key
ssh-keyscan -t ed25519 github.com >> "$HOME/.ssh/known_hosts" 2>/dev/null || true

# Use this key for github.com
CFG="$HOME/.ssh/config"
if ! grep -q "Host github.com" "$CFG" 2>/dev/null; then
  cat >> "$CFG" <<EOF

Host github.com
  HostName github.com
  User git
  IdentityFile $KEY
  IdentitiesOnly yes
EOF
  chmod 600 "$CFG"
  echo "Updated $CFG"
fi

cd "$(dirname "$0")/.."
git remote set-url origin git@github.com:CJLune/F_MediMotive_2026.git

echo ""
echo "=== Add this public key to GitHub ==="
echo "https://github.com/settings/ssh/new"
echo ""
cat "${KEY}.pub"
echo ""
echo "Then run: git push -u origin main"
