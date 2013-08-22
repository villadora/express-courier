module.exports = require('express')();

module.exports.courier('/query', function(app) {
    app.get('/', function(req, res) {
        res.send('GET query');
    });

    app.courier('/:qid', function(app) {
        app.get(function(req, res) {
            res.send('GET ' + req.query + ' ' + req.params.qid);
        });
    });

    app.use(function(req, res, next) {
        req.query = "what are you querying?";
        next();
    });
});
