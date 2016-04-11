window.app = window.app || {};
app.bgLayer = function () {
    console.log("app.bgLayer")
    var rootScene = engine.manager.entitiesWithTag["rootScene"];
    var sysEvent = engine.manager.registerSystems.event;
    var root = function () {
        var entity = engine.manager.newEntity();
        entity.setTag("bg");
        var comNode = entity.addComponent("node");
        comNode.property.alpha = 0;
        comNode.update();
        entity.addComponent("children");

        var action = entity.addComponent("action");

        action.property.add = true;
        action.property.duration = 1000;
        action.property.callback = function (args) {
            comNode.property.alpha = args.value;
            comNode.update();
        };
        action.update();

        action.property.add = true;
        action.property.duration = 0;
        action.property.callback = function () {
            engine.manager.entitiesWithTag["loadingLayer"].removeSelf();
        };
        action.update();

        action.property.add = true;
        action.property.group = 1;
        action.property.duration = 2000;
        action.property.callback = function (args) {
            var scale = 1 + 0.4 - 0.4 * args.value;
            comNode.property.scaleX =scale;
            comNode.property.scaleY =scale;
            comNode.update();
        };
        action.update();

        action.property.run = true;
        action.update();

        //var render = entity.components.render;
        //render.property.canvas = canvas;
        engine.manager.registerSystems.children.addChild(rootScene, entity);
        return entity;
    }();
    var bg = function () {
        var entity = engine.manager.newEntity();
        var comNode = entity.addComponent("node");
        entity.addComponent("children");
        //console.log(rootScene.components.node.property.height)

        //entity.addComponent("children");
        var comImage = entity.addComponent("image");
        comImage.property.file = "assets/header-background.jpg";
        comImage.update();

        comNode.property.x = rootScene.components.node.property.width / 2;
        //comNode.property.y = rootScene.components.node.property.height / 2;
        comNode.property.width = comImage.property.width;
        comNode.property.height = comImage.property.height;
        comNode.property.anchorPointX = 0.5;
        //comNode.property.anchorPointY = 0.5;
        var scaleX = rootScene.components.node.property.width / comImage.property.width;
        var scaleY = rootScene.components.node.property.height / comImage.property.height;
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
            } else if (comNode.property.x < -t / 2 + rootScene.components.node.property.width) {
                comNode.property.x = -t / 2 + rootScene.components.node.property.width;
                speed = -speed;
            }
            comNode.update();
        };
        timer.update();
        //处理尺寸变化
        var event = entity.addComponent("event");
        sysEvent.listen(entity, "rootSceneResize", function (aEvent) {

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