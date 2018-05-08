# Gynzy Conventions
This is the conventions repository. Aside from documenting code conventions used at Gynzy, this repository also holds common ESLint configurations used in our services.

## ESLint Installation
To install this package:

```
npm install --save-dev git+ssh://git@github.com:gynzy/gynzy-conventions.git
```

This might produce warnings about peers required by this package:

```
npm WARN gynzy-conventions@0.0.1 requires a peer of eslint@^4.13.1 but none is installed. You must install peer dependencies yourself.
```
Install each of these to resolve this, otherwise ESLint might not work properly:

```
npm install --save-dev eslint
npm install --save-dev prettier
npm install --save-dev eslint-plugin-ava
...
```

## Integrating Configs
To integrate an ESLint configuration of this repository in a _child_ repo, add a `.eslintrc.js` file containing:
```js
module.exports = {
	'extends': './node_modules/gynzy-conventions/configs/.eslintrc.js',
};
```
Any additional ESLint options can be added to this.

Integrating Prettier configs is as easy as creating a `.prettierrc.js` file containing the following:

```js
module.exports = require('gynzy-conventions/configs/.prettierrc');
```

You might want to overwrite ESLint behaviour in test files. You can do so by adding another `.eslintrc.js` file in the test directory. For instance:
```
root/
+-- test/
|   +-- .eslintrc.js	(extends .eslintrc.test.js)
+-- .eslintrc.js	(extends .eslintrc.js)
+-- .prettierrc.js	(requires .prettierrc)
```

## Documentation
[Conventions Wiki](https://github.com/gynzy/gynzy-conventions/wiki)

[Ember styleguide](./ember-styleguide.md)