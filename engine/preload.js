window.engine = window.engine || {};
(function () {
    var preload = new (function () {
        var queue = new createjs.LoadQueue();
        queue.setMaxConnections(5);
        this.getLoadQueue = function () {
            return queue;
        };
        this.getResource = function (aId) {
            return queue.getResult(aId);
        };
    })();
    this.getPreload = function () {
        return preload;
    };

}).call(engine);