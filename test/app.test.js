var express = require('express'),
courier = require('../lib'),
path = require('path'),
join = path.join
;

var app = express();
app.courier(join(__dirname, '../example'));

app.listen(8080, function() {
    console.log('App start on port 8080...');
});

