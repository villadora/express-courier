var app = module.exports = require('express')();

app.use('/:group', function(req, res, next) {
    console.log(req);
    req.group = { id: req.params.group };
    next();
});

app.get('/:group/:queryText', function(req, res) {
    req.group = {id:1};
    res.send('GET select "' + req.params.queryText + '" from group ' + req.group.id);
});


app.get('/fetch', function(req, res) {
    res.send('GET team/fetch');
});
