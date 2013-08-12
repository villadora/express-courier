module.exports = function(req, res, next) {
    req.group = { id: req.params.group };
    next();
};
