module.exports = function(app) {
    app.get('/', function(req, res) {
        res.send('GET query');
    });

    app.get(':qid', function(req, res) {
        res.send('GET ' + req.query + ' ' + req.params.qid);
    });
};

module.exports.middleware = function(req, res, next) {
    req.query = "query";
    next();
};
