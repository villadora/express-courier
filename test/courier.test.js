/**
 * Module dependencies.
 */

var express = require('express'),
request = require('supertest'),
assert = require('chai').assert,
courier = require('../'),
pending = require('./pending'),
path = require('path'),
join = path.join
;

describe('app.courier(path, opts)', function(){
    var app;

    beforeEach(function() {
        app = express();
        app.courier(join(__dirname, '../example'));
    });

    it('should contains "courier"', function(){
        assert(typeof(app.courier) === 'function');
    });


    it('use courier: simple routing', function(done) {
        request(app)
            .get('/query')
            .expect('GET query')
            .end(done);
    });


    it('use courier: with variable', function(done) {
        done = pending(8, done);

        request(app)
            .get('/user/4')
            .expect('GET user 4', done);

        request(app)
            .del('/user/4')
            .expect('DELETE user 4', done);

        request(app)
            .get('/query/3')
            .expect(200)
            .expect('Get what are you querying? 3', done);

        request(app)
            .post('/user/3/profile')
            .expect('GET profile for 3', done);

        request(app)
            .get('/user')
            .expect('GET all users', done);
        
        request(app)
            .del('/user')
            .expect('DELETE all users', done);

        request(app)
            .get('/team/fetch')
            .expect('GET team/fetch', done);

        request(app)
            .get('/team/4/what')
            .expect('GET select what from group 4', done);
    });
});

