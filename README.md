# Express-Courier

The _express-courier_ module provides ability to seperate routes into different files. It's built on '[express](https://github.com/visionmedia/express)'. You can use it to build your own controllers on express.

[![Build Status](https://travis-ci.org/villadora/express-courier.png?branch=master)](https://travis-ci.org/villadora/express-courier)

## Installation

npm: 

    $ npm install express-courier
   
## Usage

To use _express-courier_, just add:

```javascript
require('express-courier');
...
app.courier(<path of module apps>);
...
```

Then you can write your file under the _path_of_route_files_.

Go to [example](example/) folder to view examples.

The directory/filename will be the name in the routing path; If you want to use the name like params, just put _.v_ after the name of directory/filename and before the extension.

### use a directory as routes

You can use directory tree to organize your routes.

    app.courier(__dirname+'/foder');


Then you can put files under '/folder':


    // /folder/query/index.js
    module.exports = require('express')();
    
    module.exports.get('/:context', function(req, res) {
        res.send('GET /query/'+req.param.context);
    });


    // /folder/user/index.js
    module.exports.courier = function(app) {
        app.get('/all', function(req, res) {
            res.send('GET /user/all');
        });
    };


The app will response to:

    GET /query/xxx
    GET /user/all

In each file, you can use app as normal express application.

### use as express-namespace

Just like express-namespace, but which is more powerful as it use the mount feature in express itself(I guess the 'mount' is not imported when express-namespace was created)

    app.courier('/forum/:id', function(app){
        app.get('/(view)?', function(req, res){
            res.send('GET forum ' + req.params.id);
        });
      
        app.get('/edit', function(req, res){
            res.send('GET forum ' + req.params.id + ' edit page');
        });
        
        app.courier('/thread', function(){
            app.get('/:tid', function(req, res){
                res.send('GET forum ' + req.params.id + ' thread ' + req.params.tid);
            });
        });
    });


The app will response to:

    GET /forum/12
    GET /forum/12/view
    GET /forum/12/edit
    GET /forum/12/thread/5



## Test

First install npm dependencies:

    $ npm install
    
Then run tests:

    $ make test

Or

    $ npm run test

## License

(The MIT License)

    Copyright (c) 2013 Villa.Gao <jky239@gmail.com>;
    
    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    'Software'), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
    IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
    CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
    TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
    SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
