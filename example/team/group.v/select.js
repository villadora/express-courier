module.exports = function(app) {
    app.get('/:queryText', function(req, res) {
        res.send('GET select "' + req.params.queryText + '" from group ' + req.group.id);
    });
};

