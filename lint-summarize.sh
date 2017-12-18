#!/bin/bash

rules=( "valid-jsdoc: error"
	"require-jsdoc: [warn, {require: {FunctionDeclaration: true, MethodDefinition: true, ClassDeclaration: true } }]"
	"max-statements: [error, 20]"
	"complexity: [error, 10]"
	"max-params: [error, 5]"
	"no-param-reassign: [error]"
)

echo "=== Total ==="
eslint . | grep problems

for R in "${rules[@]}"
do
	rulename=$(cut -d ':' -f1 <<< "${R}")
	echo "=== $rulename ==="
	eslint . --no-eslintrc --parser-options=sourceType:module --parser-options=ecmaVersion:8 \
		--ignore-pattern "test/**/*" --rule "${R}" | grep problems
done
