module.exports = function(app) {
    app.get('/', function(req, res) {
        res.send('GET all users');
    });
    
    app.del('/', function(req, res) {
        res.send('DELETE all users');
    });
};

