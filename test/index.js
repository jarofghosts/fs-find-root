var path = require('path')

var test = require('tape')

var find = require('../')

var deepPath = path.join(__dirname, '1level', '2level', '3level')

test('can find dir', function (t) {
  t.plan(2)

  find.dir('.findlevel', deepPath, canFindDir)

  function canFindDir (err, found) {
    t.ok(!err)
    t.strictEqual(found, path.join(__dirname, '1level', '.findlevel'))
  }
})

test('knows type', function (t) {
  t.plan(2)
  find.file('.findlevel', deepPath, knowsType)

  function knowsType (err, found) {
    t.ok(!err)
    t.ok(!found)
  }
})

test('can find file', function (t) {
  t.plan(2)
  find('file', 'index.js', deepPath, canFindFile)

  function canFindFile (err, found) {
    t.ok(!err)
    t.strictEqual(found, path.join(__dirname, 'index.js'))
  }
})

test('searches up more than once', function (t) {
  t.plan(2)
  find.file('package.json', deepPath, skysTheLimit)

  function skysTheLimit (err, found) {
    t.ok(!err)
    t.strictEqual(found, path.resolve(__dirname, '..', 'package.json'))
  }
})

test('finds the nearest to current dir', function (t) {
  t.plan(2)
  find('dir', 'multi-level', deepPath, usesNearest)

  function usesNearest (err, found) {
    t.ok(!err)
    t.strictEqual(
        found,
        path.join(__dirname, '1level', '2level', 'multi-level')
    )
  }
})

test('returns null if not found', function (t) {
  t.plan(2)

  find('file', '--------', deepPath, reportsNull)

  function reportsNull (err, result) {
    t.ok(!err)
    t.equal(result, null)
  }
})
