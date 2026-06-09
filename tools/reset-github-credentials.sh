#!/bin/sh
# Clear cached GitHub HTTPS credentials from macOS Keychain (safe — does not print secrets).
# After running, push again and use a GitHub PAT (ghp_...) as the password, not your account password.
set -e
printf 'host=github.com\nprotocol=https\n\n' | git credential-osxkeychain erase 2>/dev/null || true
printf 'host=github.com\nprotocol=https\n\n' | git credential reject 2>/dev/null || true
echo "Cleared cached GitHub HTTPS credentials for github.com."
echo "Next: git push -u origin main"
echo "  Username: CJLune"
echo "  Password: your GitHub PAT (https://github.com/settings/tokens — scope: repo)"
