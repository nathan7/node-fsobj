var fs = require('fs');
var path = require('path');
var exports = module.exports = fsobj;

function fsobj(pathname, postfix) {
    var obj = {};
    var files = fs.readdirSync(pathname);
    files.forEach(function(fname) {
        var fpath = path.join(pathname, fname);
        var stats = fs.statSync(fpath);
        var getter;
        var propname = fname;
        if (stats.isFile()) {
            getter = fs.readFileSync.bind(null, fpath, 'utf8');
            if (postfix && fname.slice(-postfix.length) == postfix) propname = fname.slice(0, -postfix.length);
        }
        else if (stats.isDirectory()) {
            getter = fsobj.bind(null, fpath, postfix);
        }

        Object.defineProperty(obj, propname, {
            enumerable: true,
            configurable: true,
            get: getter
        });
    });
    return obj;
}
