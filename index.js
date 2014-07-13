var path = require('path')
  , fs = require('fs')

function find(fileOrDir, toFind, dir, cb) {
  var pieces = dir.split(path.sep)

  tryStat(pieces)

  function tryStat(dirPieces) {
    if(!dirPieces.length) return cb(null, null)
    var check = dirPieces.concat(toFind).join(path.sep)

    fs.stat(check, interpretResult)

    function interpretResult(err, stats) {
      if(err || !stats[fileOrDir === 'dir' ? 'isDirectory' : 'isFile']()) {
        return tryStat(dirPieces.slice(0, -1))
      }

      cb(null, check)
    }
  }
}

find.dir = find.bind(null, 'dir')
find.file = find.bind(null, 'file')

module.exports = find
