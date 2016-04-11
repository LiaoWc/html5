window.app = window.app || {};
app.rootStage = function () {
    console.log("app.rootStage")
    var manager = engine.manager;
    var sysEvent = engine.manager.registerSystems.event;
    var sysTouch = engine.manager.registerSystems.touch;
    var canvas = function () {
        var canvas = document.createElement("canvas");
        canvas.id = "rootStage";
        canvas.style.padding = "0";
        canvas.style.margin = "0";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.zIndex = 2;
        canvas.style.position = "absolute";
        var initCanvas = function () {
            canvas.style.width = window.innerWidth;
            canvas.style.height = window.innerHeight;
            canvas.width = window.innerWidth * engine.dpr;
            canvas.height = window.innerHeight * engine.dpr;
            sysEvent.dispatch(entity, "windowResize", {
                width: window.innerWidth,
                height: window.innerHeight
            })
        };
        window.addEventListener('resize', initCanvas, false);
        initCanvas();

        document.body.appendChild(canvas);
        sysTouch.listen(canvas);
        return canvas;
    }();

    var entity = manager.newEntity();
    entity.setTag("rootStage");
    var comNode = entity.addComponent("node");

    entity.addComponent("children");
    var comRender = entity.components.render;
    comRender.property.canvas = canvas;
    var systemRender = manager.registerSystems.render;
    systemRender.rootEntity = entity;

    //设置适配方案
    var rootStageInit = function () {
        comNode.property.width = window.innerWidth;
        var scale = window.innerWidth / comNode.property.width;
        comNode.property.height = window.innerHeight / window.innerWidth * comNode.property.width;
        comNode.property.scaleX = scale;
        comNode.property.scaleY = scale;
        comNode.update();
    };
    rootStageInit();

    //处理尺寸变化
    var event = entity.addComponent("event");
    sysEvent.listen(entity, "windowResize", function (aEvent) {
        rootStageInit();
        sysEvent.dispatch(entity, "rootStageResize", {
            width: comNode.property.width,
            height: comNode.property.height
        })
    });

//app.debugView();
    app.bgLayer();
    //app.bg();

    //app.home();
    //app.about();
    //app.resume();
    //app.skill();
    //app.works();
    app.navigationBar();

    sysEvent.dispatch(entity, "rootStageResize", {
        width: comNode.property.width,
        height: comNode.property.height
    })
}