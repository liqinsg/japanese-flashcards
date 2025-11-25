#!/usr/bin/bash

# Default commit message
DEFAULT_MSG="some changes"
# Check for the -m option
while getopts "m:" opt; do
  case ${opt} in
    m )
      COMMIT_MSG="$OPTARG"
      ;;
    \? )
      echo "Usage: cmd [-m commit_message]"
      exit 1
      ;;
  esac
done

# If COMMIT_MSG is empty, use the default message
COMMIT_MSG="${COMMIT_MSG:-$DEFAULT_MSG}"

# Check if there are changes to commit
if [[ -z $(git status --porcelain) ]]; then
  echo "Nothing to commit, working tree clean"
  exit 0
fi

# Git commands
git add .
git commit -m "$COMMIT_MSG"
git push origin main
npm run deploy
