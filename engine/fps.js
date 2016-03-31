window.engine = window.engine || {};
(function () {
    var p = document.createElement("p");
    p.style.color = "#fff";
    p.style.padding = "0";
    p.style.margin = "0";
    p.style.position = "absolute";
    document.body.appendChild(p);
    engine.showFPS = function (aDelta) {
        p.innerHTML = "FPS:" + aDelta;
    };
}).call(engine);