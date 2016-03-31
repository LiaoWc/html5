window.engine = window.engine || {};
(function () {

    //var input = document.createElement('input');
    //document.body.appendChild(input);
    //var style = input.style;
    //style.zIndex = '2';
    //style.position = 'absolute';
    ////style.border = 'none';
    //style.outline = 'medium';
    //style.background = 'none';
    //style.padding = '0px';
    //style.bottom = "0px";
    //input.onfocus = function (){
    //    //engine.isTexting = true;
    //    engine.inputHeight = engine.getCanvas().height;
    //    //console.log("f")
    //    //alert(engine.getCanvas().height)
    //}
    //input.onblur = function (){
    //    engine.input = null;
    //}


    var canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.padding = "0";
    canvas.style.margin = "0";
    //canvas.style.position = "absolute";
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

    var _dpi = 1;
    engine.getDPR = function () {
        if (IsPC()) {
            _dpi = 2;
        } else {
            _dpi = 1;
        }
        return _dpi;
    };
    engine.setDPR = function (aNumber) {
    }
    var initCanvas = function () {
        var dpr = engine.getDPR();
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
    };
    initCanvas();
    document.body.appendChild(canvas);
    window.addEventListener('resize', initCanvas, false);

    engine.getCanvas = function () {
        return canvas;
    };

    return canvas;
}).call(engine);