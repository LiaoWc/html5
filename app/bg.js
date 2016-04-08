window.app = window.app || {};
app.bg = function () {
    console.log("app.bg")
    var rootStage = engine.manager.entitiesWithTag["rootStage"];
    var sysEvent = engine.manager.registerSystems.event;
    //var canvas = function () {
    //    var canvas = document.createElement("canvas");
    //    canvas.style.padding = "0";
    //    canvas.style.margin = "0";
    //    canvas.style.top = "0";
    //    canvas.style.left = "0";
    //    canvas.style.zIndex = 0;
    //    canvas.style.position = "absolute";
    //    var initCanvas = function () {
    //        canvas.style.width = window.innerWidth;
    //        canvas.style.height = window.innerHeight;
    //        canvas.width = window.innerWidth * engine.dpr;
    //        canvas.height = window.innerHeight * engine.dpr;
    //    };
    //    window.addEventListener('resize', initCanvas, false);
    //    initCanvas();
    //    document.body.appendChild(canvas);
    //    return canvas;
    //}();
    var root = function () {
        var entity = engine.manager.newEntity();
        entity.setTag("bg");
        var comNode = entity.addComponent("node");
        entity.addComponent("children");
        //var render = entity.components.render;
        //render.property.canvas = canvas;
        engine.manager.registerSystems.children.addChild(rootStage, entity);
        return entity;
    }();
    var bg = function () {
        var entity = engine.manager.newEntity();
        var comNode = entity.addComponent("node");
        entity.addComponent("children");
        //console.log(rootStage.components.node.property.height)

        //entity.addComponent("children");
        var comImage = entity.addComponent("image");
        comImage.property.file = "assets/header-background.jpg";
        comImage.update();

        comNode.property.x = rootStage.components.node.property.width / 2;
        //comNode.property.y = rootStage.components.node.property.height / 2;
        comNode.property.width = comImage.property.width;
        comNode.property.height = comImage.property.height;
        comNode.property.anchorPointX = 0.5;
        //comNode.property.anchorPointY = 0.5;
        var scaleX = rootStage.components.node.property.width / comImage.property.width;
        var scaleY = rootStage.components.node.property.height / comImage.property.height;
        var scale = Math.max(scaleX, scaleY);
        comNode.property.scaleX = scale;
        comNode.property.scaleY = scale;
        comNode.property.rotation = 0;
        comNode.update();

        var timer = entity.addComponent("timer");
        var speed = 0.01;
        timer.property.callback = function (aDelta) {
            //console.log(aDelta)

            var t = comImage.property.width * comNode.property.scaleX;
            comNode.property.x += aDelta * speed;
            if (comNode.property.x > t / 2) {
                comNode.property.x = t / 2;
                speed = -speed;
            } else if (comNode.property.x < -t / 2 + rootStage.components.node.property.width) {
                comNode.property.x = -t / 2 + rootStage.components.node.property.width;
                speed = -speed;
            }
            comNode.update();
        };
        timer.update();
        //处理尺寸变化
        var event = entity.addComponent("event");
        sysEvent.listen(entity, "rootStageResize", function (aEvent) {

            //comNode.property.y = aEvent.height / 2;
            var scaleX = aEvent.width / comImage.property.width;
            var scaleY = aEvent.height / comImage.property.height;
            var scale = Math.max(scaleX, scaleY);
            comNode.property.scaleX = scale;
            comNode.property.scaleY = scale;
        });
        engine.manager.registerSystems.children.addChild(root, entity);
        return entity;
    }();
}