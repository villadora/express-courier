/**
 * Module dependencies.
 */

var express = require('express'),
request = require('supertest'),
assert = require('chai').assert,
courier = require('../lib'),
pending = require('./pending'),
path = require('path'),
join = path.join
;

describe('app.courier(path, opts)', function(){
    var app;

    beforeEach(function() {
        app = express();
    });

    it('should contains "courier"', function(){
        assert(typeof(app.courier) === 'function');
    });


    it('use courier: simple routing', function(done) {
        app.courier(join(__dirname, '../example'));

        request(app)
            .get('/query')
            .expect('GET query', done);
    });


    it('use courier: with variable', function(done) {
        done = pending(3, done);
        app.courier(join(__dirname, '../example'));

        request(app)
            .get('/user/4')
            .expect('GET user 4', done);

        request(app)
            .del('/user/4')
            .expect('DELETE user 4', done);

        request(app)
            .get('/query/3')
            .expect('GET query 3', done);
    });

    
    it('use courier: index', function(done){
        done = pending(2, done);
        app.courier(join(__dirname, '../example'));
        
        request(app)
            .get('/user')
            .expect('GET all users', done);
        
        request(app)
            .del('/user')
            .expect('DELETE all users', done);
    });

    it('use courier: middleware', function(done) {
        done = pending(3, done);
        app.courier(join(__dirname, '../example'));

        request(app)
            .get('/team/4/select/david')
            .expect('GET select "david" from group 4', done);
       
        request(app)
            .get('/team/4/fetch')
            .expect('GET fetch 4', done);

        request(app)
            .get('/query/3')
            .expect('GET query 3', done);
    });
});

