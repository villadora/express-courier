var app = module.exports = require('express')();

var middleware = function(req, res, next) {
    req.group = { id: req.params.group };
    next();
};

app.get('/:group/:queryText', middleware, function(req, res) {
    res.send('GET select "' + req.params.queryText + '" from group ' + req.group.id);
});


app.get('/fetch/:group', middleware, function(req, res) {
    res.send('GET team/fetch 4');
});
