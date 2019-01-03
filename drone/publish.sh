#!/bin/bash

set -eo pipefail

VERSION=`yarn version --non-interactive 2>/dev/null | grep 'Current version' | grep -o -E '[0-9]+(\.[0-9]+){1,2}$'`
if [ "$DRONE_BUILD_EVENT" == "pull_request" ]; then
	PR=`cut -d: -f1 <<< $DRONE_COMMIT_REFSPEC`
	HASH=${DRONE_BUILD_NUMBER}

	PUBLISHVERSION="$VERSION-$PR.$HASH"
	TAG=$PR
elif [ "$DRONE_BUILD_EVENT" == "tag" ]; then
	if [ "$DRONE_TAG" != "$VERSION" ]; then
		exit 1
	fi
	PUBLISHVERSION=$VERSION
	TAG="latest"
else
	exit 1
fi

yarn publish --non-interactive --no-git-tag-version --tag "$TAG" --new-version "$PUBLISHVERSION"
