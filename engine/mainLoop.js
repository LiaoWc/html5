window.engine = window.engine || {};
(function () {
    var tLast = 0;
    var raf = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame;
    })();
    var isInit = false;
    this.run = function () {
        if (isInit == false) {
            var loop = function loop(aTime) {
                if (tLast == 0) {
                    tLast = aTime;
                } else {
                    var tDelta = aTime - tLast;
                    tLast = aTime;
                    engine.manager.mainLoop(tDelta);
                }
                raf(loop);
            }
            raf(loop);
            isInit = true;
        }
    };
}).call(engine);