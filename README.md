fs-find-root
====

[![Build Status](https://travis-ci.org/jarofghosts/file-content-stream.png?branch=master)](https://travis-ci.org/jarofghosts/file-content-stream)

search up directories until you find what you're looking for

## usage

`var find = require('fs-find-root')`

* `find(name, starting_directory, callback)` searches for directory `name`
starting from `start_directory` and calls `callback` with the results
* `find.file(name, starting_directory, callback)` does the same but looking
for a file instead of a directory
* `find.dir === find` you can use it either way you prefer

## example

```js
var find = require('fs-find-root')

// find a directory!
find('.git', process.cwd(), function(err, found) {
  if (err) return err
  console.log('found the root of your git repo @ ' + found)
})

// find a file!
find.file('package.json', process.cwd(), function(err, found) {
  if (err) return err
  console.log('found yer package.json right here: ' + found)
})
```

## license

MIT
