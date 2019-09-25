const path = require('path')

// slash at the beginning of a filename
const pathSeparator = new RegExp(path.sep, 'g')

// all slashes in the filename. path.sep is OS agnostic (windows, mac, etc)
const leadingPathSeparator = new RegExp(`^${path.sep}`)

// derive `foo.bar.baz` object key from `foo/bar/baz.yml` filename
module.exports = function filenameToKey (filename) {
  const extension = new RegExp(`${path.extname(filename)}$`)
  const key = filename
    .replace(extension, '')
    .replace(leadingPathSeparator, '')
    .replace(pathSeparator, '.')

  return key
}
