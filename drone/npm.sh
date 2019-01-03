#!/bin/bash

set -eo pipefail

if [ -z "$NPM_TOKEN" ]; then
	echo "Drone secret 'npm_token' not set."
	exit 1
fi

cat <<EOF > .npmrc
registry=https://npm.gynzy.net/
always-auth="true"
"//npm.gynzy.net/:_authToken"="${NPM_TOKEN}"
EOF
