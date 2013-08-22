module.exports.courier = function(app) {
    app.get('/info', function(req, res) {
        res.send('GET team/info');
    });
};
