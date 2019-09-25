# data-directory

A Node.js module to recursively load a directory of YAML, JSON, and Markdown files into a JavaScript object.

## Installation

```
npm install @github-docs/data-directory
```

## Usage

Given the following file tree:

```
$ tree data
data
├── bar.yaml
├── foo.json
└── nested
    └── baz.md
```

and the following content in each file:

```
$ cat foo.json
{"meaningOfLife": 42}

$ cat bar.yaml
another_markup_language: 'yes'

$ cat nested/baz.md
I am markdown!
```

then running this code:

```js
const path = require('path')
const dataDirectory = require('@github-docs/data-directory')
const data = dataDirectory(path.join(__dirname, 'data'))
```

will return this object:

```js
{
  bar: { another_markup_language: 'yes' },
  foo: { meaningOfLife: 42 },
  nested: { baz: 'I am markdown!' }
}
```

## API

This module exports a single synchronous function `dataDirectory` that returns
an Object.

### `dataDirectory(directory, [options])`

- `directory` String (required) - Full path to the directory to read.
- `options` Object
  - `extensions` Array - A case-insensitive array of filenames to load. Defaults to `['.json', '.md', '.markdown', '.yaml', '.yml']`
  - `ignorePatterns` Array - Filename patterns to ignore. Every value in the array must be a regular expression. Defaults to `[/README\.md$/i]`. To include `README.md` files in your data object, specify an empty array: `[]`.
  - `preprocess` Function - A function that can be used to modify each loaded file's content before it's added to the data object. Default is a no-op function that return the unmodified content: `(content) => { return content }`