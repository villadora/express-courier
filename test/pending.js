module.exports = function(n, fn) {
    if (n) return function() {
            --n || fn.apply(this, arguments);
        };
    fn();
    return function() {};
};
