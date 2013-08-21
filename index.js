var express = require('express'),
fs = require('fs'),
path = require('path'),
join = path.join,
basename = path.basename,
existsSync = fs.existsSync || path.existsSync,
apps = express.application ? [express.application] : [express.HTTPServer.prototype, express.HTTPSServer.prototype] // express 2.x
;

function applyModule(app, ns, module) {
    if(module.handle && module.set)
        app.use(ns, module);
    else if(typeof module === 'function') {
        var mapp = express();
        module(mapp);
        app.use(ns, mapp);
    }
}


/**
 * @param {string} path
 * @param {Object=} options
 */

var courier = exports.courier = function(path, app) {
    if(typeof path != 'string') 
        throw new Error('[path] should be provided!');
    
    if(app) {
        applyModule(this, path, app);
        return;
    }

    var stat = fs.statSync(path);
    if(!stat) {
        throw new Error('path:'+path+' is not valid');
    }else if(stat.isDirectory()) {
        placePath(this, path, '/');
    }else if(stat.isFile()) {
        var ns = basename(fpath),
        moduleapp = require(fpath);
        applyModule(this, ns, moduleapp);
    }
};

apps.forEach(function(app) {
    app.courier = courier;
});


/**
 * @param {Express} app
 * @param {string} path
 * @param {Object=} opts
 */
var placePath = module.exports.placePath = function(app, path, namespace) {
    var files = fs.readdirSync(path);
    files.forEach(function(file) {
        var fpath = join(path, file),
        stat = fs.statSync(fpath);

        if(!stat) {
            console.warn('Cannot read file:' + file);
            return;
        }
        
        if(stat.isFile()) {
            if(/\.js$/.test(file)) {
                var moduleapp = require(fpath);
                if(moduleapp.handle && moduleapp.set) // is express app
                    app.use(namespace, moduleapp);
                else if(typeof moduleapp ===  'function') {
                    var mapp = express();
                    moduleapp(mapp);
                    app.use(namespace, mapp);
                }
            }
        }else if(stat.isDirectory()) {
            placePath(app, fpath, [namespace, basename(fpath)].join('/').replace(/\/\//g, '/').replace(/\/$/, '')); 
        }
    });
};
