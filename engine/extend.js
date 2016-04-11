window.extend = window.extend || {};

extend = new (function () {
    this.rounded = function (aNumber) {
        // With a bitwise or.
        var res = (0.5 + aNumber) | 0;
// A double bitwise not.
        res = ~~(0.5 + aNumber);
// Finally, a left bitwise shift.
        res = (0.5 + aNumber) << 0;
        return res;
    }
})();