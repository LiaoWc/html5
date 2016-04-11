window.app = window.app || {};
app.init = function () {
    console.log("app.init");
    //触摸系统
    var sysEvent = engine.manager.registerSystems.event;
    //事件系统
    var sysTouch = engine.manager.registerSystems.touch;
    //初始化Canvas
    var canvas = function () {
        var canvas = document.createElement("canvas");
        canvas.id = "rootCanvas";
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
            sysEvent.dispatch(entity, "rootCanvasResize", {
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
    //初始化根场景
    var entity = engine.manager.newEntity();
    entity.setTag("rootScene");
    var cNode = entity.addComponent("node");
    entity.addComponent("children");
    var cRender = entity.components.render;
    cRender.property.canvas = canvas;
    var sRender = engine.manager.registerSystems.render;
    sRender.rootEntity = entity;

    //设置适配方案
    var rootStageInit = function () {
        cNode.property.width = window.innerWidth;
        var scale = window.innerWidth / cNode.property.width;
        cNode.property.height = window.innerHeight / window.innerWidth * cNode.property.width;
        cNode.property.scaleX = scale;
        cNode.property.scaleY = scale;
        cNode.update();
    };
    rootStageInit();

    //处理尺寸变化
    var event = entity.addComponent("event");
    sysEvent.listen(entity, "rootCanvasResize", function (aEvent) {
        rootStageInit();
        sysEvent.dispatch(entity, "rootSceneResize", {
            width: cNode.property.width,
            height: cNode.property.height
        })
    });

    //初始化加载页面
    app.loadingLayer();

}