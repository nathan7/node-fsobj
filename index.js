var exports = module.exports = fsobj
  , fs = require('fs')
  , path = require('path')

function fsobj(pathname, postfix) {
    var obj = {}
      , files = fs.readdirSync(pathname)
    files.forEach(function(fname) {
        var fpath = path.join(pathname, fname)
          , stats = fs.statSync(fpath)
          , propname = fname
          , getter

        if (stats.isFile()) {
            getter = fs.readFileSync.bind(null, fpath, 'utf8')
            if (postfix && fname.slice(-postfix.length) == postfix) propname = fname.slice(0, -postfix.length)
        }
        else if (stats.isDirectory()) {
            getter = fsobj.bind(null, fpath, postfix)
        }

        Object.defineProperty(obj, propname, {
            enumerable: true,
            configurable: true,
            get: getter
        })
    })
    return obj
}
