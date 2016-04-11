window.app = window.app || {};
app.debugView = function () {
    console.log("app.debugView")
    var rootStage = engine.manager.entitiesWithTag["rootStage"];

    var canvas = function () {
        var canvas = document.createElement("canvas");
        canvas.style.padding = "0";
        canvas.style.margin = "0";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.zIndex = 2;
        canvas.style.position = "absolute";

        var initCanvas = function () {
            canvas.style.width = window.innerWidth;
            canvas.style.height = 25;
            canvas.width = window.innerWidth * engine.dpr;
            canvas.height = 25 * engine.dpr;
        };
        window.addEventListener('resize', initCanvas, false);
        initCanvas();
        document.body.appendChild(canvas);
        return canvas;
    }();
    var debug = function () {
        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");
        node.property.width = canvas.width / engine.dpr;
        node.property.height = canvas.height / engine.dpr;
        node.update();
        console.log(canvas.width)
        entity.addComponent("children");

        var event = entity.addComponent("event");
        var sysEvent = engine.manager.registerSystems.event;
        sysEvent.listen(entity, "rootStageResize", function (aEvent) {
            node.property.width = canvas.width / engine.dpr;
            node.property.height = canvas.height / engine.dpr;
            sysEvent.dispatch(entity, "debugViewResize", {
                width: node.property.width,
                height: node.property.height,
            })
        });

        var comRender = entity.components.render;
        comRender.property.canvas = canvas;

        engine.manager.registerSystems.children.addChild(rootStage, entity);
        return entity;
    }();
    var bg = function () {
        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");
        node.property.width = debug.components.node.property.width;
        node.property.height = debug.components.node.property.height;
        node.property.alpha = 0.5;
        node.update();
        entity.addComponent("children");
        var hierarchy = entity.components.hierarchy;
        //hierarchy.property.level = 0;
        hierarchy.update();
        var rect = entity.addComponent("rect");
        rect.property.width = node.property.width;
        rect.property.height = node.property.height;
        rect.property.fillColor = "#000";
        rect.update();

        var event = entity.addComponent("event");
        var sysEvent = engine.manager.registerSystems.event;
        sysEvent.listen(entity, "debugViewResize", function (aEvent) {
            rect.property.width = aEvent.width;
            rect.property.height = aEvent.height;
            rect.update();
        });


        engine.manager.registerSystems.children.addChild(debug, entity);


        return entity;
    }();

    var fps = function () {
        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");
        node.property.alpha = 0.8;
        node.update();
        entity.addComponent("children");

        var text = entity.addComponent("text");
        text.property.fillText = "FPS:60.0";
        //text.property.height = 100;
        text.property.fontSize = 20;
        text.property.fillColor = "#fff";
        text.update();

        var timer = entity.addComponent("timer");
        timer.property.interval = 500;
        timer.property.callback = function (aDelta) {
            //console.log(Math.ceil(60 * timer.property.interval / aDelta))
            text.property.fillText = "FPS:" + (60 * timer.property.interval / aDelta).toFixed(1);
            text.update();
        }

        engine.manager.registerSystems.children.addChild(debug, entity);
        return entity;
    }();
    var inner = function () {
        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");
        node.property.x = fps.components.text.property.width;
        node.property.alpha = 0.8;
        node.update();
        entity.addComponent("children");

        var text = entity.addComponent("text");

        text.property.fillText = "|width:" + rootStage.components.node.property.width + "|height:" + rootStage.components.node.property.height;
        //text.property.height = 100;
        text.property.fontSize = 20;
        text.property.fillColor = "#fff";
        text.update();

        var event = entity.addComponent("event");
        var sysEvent = engine.manager.registerSystems.event;
        sysEvent.listen(entity, "rootStageResize", function (aEvent) {
            text.property.fillText = "|width:" + aEvent.width + "|height:" + aEvent.height;
            text.update();
        });

        engine.manager.registerSystems.children.addChild(debug, entity);
        return entity;
    }();
}