const path = require('path')
const dataDirectory = require('..')
const fixturesDir = path.join(__dirname, 'fixtures')
describe('data-directory', () => {
  test('works', () => {
    const data = dataDirectory(fixturesDir)
    const expected = {
      bar: { another_markup_language: 'yes' },
      foo: { meaningOfLife: 42 },
      nested: { baz: 'I am markdown!' }
    }
    expect(data).toEqual(expected)
  })

  test('option: preprocess function', () => {
    const preprocess = function (content) {
      return content.replace('markdown', 'MARKDOWN')
    }
    const data = dataDirectory(fixturesDir, { preprocess })
    expect(data.nested.baz).toBe('I am MARKDOWN!')
  })

  test('option: extensions array', () => {
    const extensions = ['.yaml', 'markdown']
    const data = dataDirectory(fixturesDir, { extensions })
    expect('bar' in data).toBe(true)
    expect('foo' in data).toBe(false) // JSON file should be ignored
  })

  test('option: ignorePatterns', () => {
    const ignorePatterns = []

    // README is ignored by default
    expect('README' in dataDirectory(fixturesDir)).toBe(false)

    // README can be included by setting empty ignorePatterns array
    expect('README' in dataDirectory(fixturesDir, { ignorePatterns })).toBe(true)
  })
})
