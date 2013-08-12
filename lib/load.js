var path = require('path'),
join = path.join,
fs = require('fs'),
existsSync = fs.existsSync || path.existsSync,
namespace = require('express-namespace')
;

/**
 * @param {Express} app
 * @param {Object} courier
 */
var load = module.exports.load = function(app, courier, opts) {
    courier.before && courier.before(app);
    courier(app);
    courier.after && courier.after(app);
};


var skipRegExp = /^([a-zA-Z0-9]*)\.(middleware|index)\.js$/;


/**
 * @param {Express} app
 * @param {string} path
 * @param {Object=} opts
 */
var placePath = module.exports.placePath = function(app, path, opts) {
    var files = fs.readdirSync(path);
    files.forEach(function(file) {
        var fpath = join(path, file),
            isSkip = skipRegExp.test(file);

        if(isSkip) return; // ignore middleware.js files

        var stat = fs.statSync(fpath);
        if(!stat) {
            console.warn('Cannot read file:' + file);
            return;
        }
        
        var nso = filename2namespace(file), name = nso.name, ns = nso.namespace;
        if(stat.isFile()) {
            var c = require(fpath),
            mw = c.middleware,
            loading = function() { load(app, c, opts); };
            if(mw instanceof Array) 
                app.namespace.apply(app, [ns].concat(mw, loading));
            else if(mw) 
                app.namespace(ns, mw, loading);
            else 
                app.namespace(ns, loading);
        }else if(stat.isDirectory()) {
            var mwPath = join(fpath, name+'.middleware.js'),
            idxPath = join(path, name+'.index.js'),
            hasIndex = existsSync(idxPath);
            hasMW = existsSync(mwPath),
            placing = function() {
                hasIndex && load(app, require(idxPath), opts);
                placePath(app, fpath, opts); 
            };

            if(hasMW) {
                var mw = require(mwPath);
                (mw instanceof Array) ? 
                    (app.namespace.app(app, [ns].concat(mw, placing))) 
                    : (app.namespace(ns, mw, placing));
            }else 
                app.namespace(ns, placing);
        }
    });
};


/**
 * @param {string} filename
 * @return {Object}
 */
function filename2namespace(filename) {
    var matches = /^([_a-zA-Z0-9]+)(?:\.([_a-zA-Z0-9]*))?/.exec(filename), name, ns, v;
    if(matches) {
        name = matches[1], v = matches[2],
        ns = (v == 'v') ? (ns = ":"+name) : (ns = name);
    }else 
        throw new Error('Invalided filename in courier path:' + filename);

    return {
        name: name,
        namespace: '/' + ns
    };
}
