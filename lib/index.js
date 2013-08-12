var express = require('express'),
methods = require('methods'),
fs = require('fs'),
load = require('./load').load,
placePath = require('./load').placePath,
apps = express.application ? [express.application] : [express.HTTPServer.prototype, express.HTTPSServer.prototype] // express 2.x
;

/**
 * @param {string} path
 * @param {Object=} options
 */

var courier = exports.courier = function(path, options) {
    options = options || {};
    if(typeof path != 'string')
        throw new Error('[path] should be provided!');
    
    var stat = fs.statSync(path);
    if(!stat) {
        throw new Error('path:'+path+' is not valid');
    }else if(stat.isDirectory()) {
        placePath(this, path, options);
    }else if(stat.isFile()) {
        load(this, require(path));
    }
};

apps.forEach(function(app) {
    app.courier = courier;
});
