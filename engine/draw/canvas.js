window.engine = window.engine || {};
(function() {
    engine.newCanvas = function() {
        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.padding = "0";
        canvas.style.margin = "0";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.zIndex = 1;
        canvas.style.position = "absolute";
        function IsPC() {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        }
        var initCanvas = function() {
            if (IsPC()) {
                canvas.width = window.innerWidth * engine.dpr;
                canvas.height = window.innerHeight * engine.dpr;
            } else {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };
        initCanvas();
        document.body.appendChild(canvas);
        window.addEventListener('resize', initCanvas, false);
        return canvas;
    };
}).call(engine);