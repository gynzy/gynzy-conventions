#!/bin/bash

set -eo pipefail

VERSION=`yarn version --non-interactive 2>/dev/null | grep 'Current version' | grep -o -E '[0-9]+(\.[0-9]+){1,2}$'`
if [ "$DRONE_BUILD_EVENT" == "pull_request" ]; then
	PUBLISHVERSION="$VERSION-$DRONE_SOURCE_BRANCH.$DRONE_BUILD_NUMBER"
	TAG=$DRONE_SOURCE_BRANCH
elif [ "$DRONE_BUILD_EVENT" == "tag" ]; then
	if [ "$DRONE_TAG" != "$VERSION" ]; then
		exit 1
	fi
	PUBLISHVERSION=$VERSION
	TAG="latest"
else
	exit 1
fi

echo "Publishing package with tag: $TAG and version: $PUBLISHVERSION";

yarn publish --non-interactive --no-git-tag-version --tag "$TAG" --new-version "$PUBLISHVERSION"
