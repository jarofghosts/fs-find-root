var assert = require('assert'),
    path = require('path'),
    deep_path = path.join(__dirname, '1level', '2level', '3level'),
    find = require('../')

find('.findlevel', deep_path, can_find_dir)

function can_find_dir(err, found) {
  assert.ok(!err)
  assert.strictEqual(found, path.join(__dirname, '1level', '.findlevel'))

  find.file('.findlevel', deep_path, knows_type)
}

function knows_type(err, found) {
  assert.ok(!err)
  assert.ok(!found)

  find.file('test.js', deep_path, can_find_file)
}

function can_find_file(err, found) {
  assert.ok(!err)
  assert.strictEqual(found, path.join(__dirname, 'test.js'))

  find.file('index.js', deep_path, skys_the_limit)
}

function skys_the_limit(err, found) {
  assert.ok(!err)
  assert.strictEqual(found, path.resolve(__dirname, '../index.js'))

  find.dir('multi-level', deep_path, uses_nearest)
}

function uses_nearest(err, found) {
  assert.ok(!err)
  assert.strictEqual(
      found,
      path.join(__dirname, '1level', '2level', 'multi-level')
  )
}
