module.exports = require('express')();

module.exports.courier('/:id', function(app) {
    app.get('/', function(req, res) {
        res.send('GET user ' + req.params.id);
    });
    
    app.del('/', function(req, res) {
        res.send('DELETE user ' + req.params.id);
    });
});
