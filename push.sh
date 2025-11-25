#!/usr/bin/bash
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

# Git commands
git add .
git commit -m "$COMMIT_MSG"
git push origin main
npm run deploy

