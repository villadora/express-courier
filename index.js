var express = require('express'),
fs = require('fs'),
path = require('path'),
join = path.join,
basename = path.basename,
existsSync = fs.existsSync || path.existsSync,
application = express.application
;

function applyModule(app, ns, module) {
    if(module.handle && module.set) {
        app.use(ns, module);
        return true;
    } else if(typeof module.courier === 'function') {
        var mapp = express();
        module.courier(mapp);
        app.use(ns, mapp);
        return true;
    }
    return false;
}


/**
 * @param {string} path
 * @param {Object=} options
 */

var courier = exports.courier = function(path, app) {
    if(typeof path != 'string') 
        throw new Error('[path] should be provided!');
    
    if(app) {
        if(!applyModule(this, path, app)) {
            var mapp = express();
            app(mapp);
            this.use(path, mapp);
        }
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

application.courier = courier;


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
                applyModule(app, namespace, moduleapp);
            }
        }else if(stat.isDirectory()) {
            placePath(app, fpath, [namespace, basename(fpath)].join('/').replace(/\/\//g, '/').replace(/\/$/, '')); 
        }
    });
};
