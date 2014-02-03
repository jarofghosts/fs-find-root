var fs = require('fs'),
    path = require('path')

function find(file_or_dir, to_find, dir, cb) {
  var pieces = dir.split(path.sep)

  try_stat(pieces)

  function try_stat(dir_pieces) {
    if (!dir_pieces.length) return cb(null, null)
    var check = dir_pieces.concat(to_find).join(path.sep)

    fs.stat(check, interpret_result)

    function interpret_result(err, stats) {
      if (err || !stats[file_or_dir === 'dir' ? 'isDirectory' : 'isFile']()) {
        return try_stat(dir_pieces.slice(0, -1))
      }

      cb(null, check)
    }
  }
}

find.dir = find.bind(null, 'dir')
find.file = find.bind(null, 'file')

module.exports = find
