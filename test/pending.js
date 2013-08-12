module.exports = function(n, fn) {
    if (n) return function() {
            --n || fn();
        };
    fn();
    return function() {};
};
