module.exports = function(app) {
    app.post('/', function(req, res) {
        res.send('GET profile for' + req.params.id);
    });
};
