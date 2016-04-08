window.app = window.app || {};
app.home = function () {
    console.log("app.home")
    var rootStage = engine.manager.entitiesWithTag["rootStage"];
    var sysEvent = engine.manager.registerSystems.event;
    var root = function () {
        var entity = engine.manager.newEntity();
        var comNode = entity.addComponent("node");
        entity.addComponent("children");
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

            var t = comImage.property.width* comNode.property.scaleX;
            comNode.property.x += aDelta * speed;
            if (comNode.property.x > t / 2) {
                comNode.property.x = t / 2;
                speed = -speed;
            } else if (comNode.property.x < -t / 2 + rootStage.components.node.property.width) {
                comNode.property.x =-t / 2 + rootStage.components.node.property.width;
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
    //
    var sentence1 = function () {
        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");
        var children = entity.addComponent("children");
        node.property.anchorPointX = 0.5;
        node.property.anchorPointY = 1;

        var text = entity.addComponent("text");
        text.property.fillText = "I'm Liao Wangcheng.";
        text.property.fontWeight = "bold";
        text.property.fontSize = 25;
        text.update();

        var event = entity.addComponent("event");
        sysEvent.listen(entity, "rootStageResize", function (aEvent) {
            var fontSize = Math.min(aEvent.width * 0.1, aEvent.height * 0.12);
            text.property.fontSize = fontSize;
            text.update();
            node.property.width = text.property.width;
            node.property.height = text.property.height;
            node.property.x = aEvent.width / 2;
            node.property.y = aEvent.height * 0.4;
            node.update();
            sysEvent.dispatch(entity, "nameResize", {
                width: text.property.width,
                height: text.property.height
            })
        });

        engine.manager.registerSystems.children.addChild(root, entity);
        return entity;
    }();

    var sentence2 = function () {
        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");
        var children = entity.addComponent("children");

        node.property.anchorPointX = 0.5;
        node.property.anchorPointY = 0;

        var text = entity.addComponent("text");
        text.property.fillText = "欢迎来到我的个人主页";
        text.property.fontSize = 25;
        text.update();

        var event = entity.addComponent("event");
        sysEvent.listen(entity, "rootStageResize", function (aEvent) {
            var fontSize = Math.min(aEvent.width * 0.1, aEvent.height * 0.1);
            text.property.fontSize = fontSize / 3;
            text.update();
            node.property.y = text.property.height * 1.4;
            node.property.width = text.property.width;
            node.property.height = text.property.height;
            node.update();
        });

        engine.manager.registerSystems.children.addChild(sentence1, entity);
        return entity;
    }();
    var sentence3 = function () {
        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");
        var children = entity.addComponent("children");
        node.property.y = 40;
        node.property.anchorPointX = 0.5;
        node.property.anchorPointY = 0;

        var text = entity.addComponent("text");
        text.property.fillText = "我是一名游戏开发工程师";
        text.property.fontSize = 25;
        text.update();

        var event = entity.addComponent("event");
        sysEvent.listen(entity, "rootStageResize", function (aEvent) {
            var fontSize = Math.min(aEvent.width * 0.1, aEvent.height * 0.1);
            text.property.fontSize = fontSize / 3;
            text.update();
            node.property.y = text.property.height * 1.4;
            node.property.width = text.property.width;
            node.property.height = text.property.height;
            node.update();
        });

        engine.manager.registerSystems.children.addChild(sentence2, entity);
        return entity;
    }();
    var sentence4 = function () {
        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");
        var children = entity.addComponent("children");
        node.property.y = 40;
        node.property.anchorPointX = 0.5;
        node.property.anchorPointY = 0;

        var text = entity.addComponent("text");
        text.property.fillText = "这里有一些关于我以及我感兴趣的信息与你分享";
        text.property.fontSize = 25;
        text.update();

        var event = entity.addComponent("event");
        sysEvent.listen(entity, "rootStageResize", function (aEvent) {
            var fontSize = Math.min(aEvent.width * 0.1, aEvent.height * 0.1);
            text.property.fontSize = fontSize / 3;
            text.update();
            node.property.y = text.property.height * 1.4;
            node.property.width = text.property.width;
            node.property.height = text.property.height;
            node.update();
        });

        engine.manager.registerSystems.children.addChild(sentence3, entity);
        return entity;
    }();
    var sentence5 = function () {
        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");
        var children = entity.addComponent("children");
        node.property.y = 40;
        node.property.anchorPointX = 0.5;
        node.property.anchorPointY = 0;

        var text = entity.addComponent("text");
        text.property.fillText = "Just enjoy yourself,please.";
        text.property.fontSize = 25;
        text.update();

        var event = entity.addComponent("event");
        sysEvent.listen(entity, "rootStageResize", function (aEvent) {
            var fontSize = Math.min(aEvent.width * 0.1, aEvent.height * 0.1);
            text.property.fontSize = fontSize / 2;
            text.update();
            node.property.y = text.property.height * 1.4;
            node.property.width = text.property.width;
            node.property.height = text.property.height;
            node.update();
        });

        engine.manager.registerSystems.children.addChild(sentence4, entity);
        return entity;
    }();
    //var sentence2 = function () {
    //    var entity = engine.manager.newEntity();
    //    var node = entity.addComponent("node");
    //    var text = entity.addComponent("text");
    //    entity.addComponent("children");
    //    //我是一名游戏开发工程师。这里有一些关于我以及我感兴趣的信息与你分享。
    //    text.property.fillText = "欢迎来到我的个人主页";
    //    text.property.fontSize = 20;
    //    text.update();
    //    node.property.anchorPointX = 0.5;
    //    //node.property.anchorPointY = 0;
    //    node.property.width = text.property.width;
    //    node.property.height = text.property.height;
    //    node.update();
    //
    //    var event = entity.addComponent("event");
    //    sysEvent.listen(entity, "nameResize", function (aEvent) {
    //        //var scale = aEvent.width / text.property.width * 0.5;
    //        //node.property.scaleX = scale;
    //        //node.property.scaleY = scale;
    //        node.update();
    //        text.update();
    //
    //        //node.property.x = rootStage.components.node.property.width / 2;
    //        node.property.y = node.property.height * node.property.scaleY;
    //        node.update();
    //    });
    //    engine.manager.registerSystems.children.addChild(sentence1, entity);
    //    return entity;
    //}();
    //var sentence3 = function () {
    //    var entity = engine.manager.newEntity();
    //    var node = entity.addComponent("node");
    //    var text = entity.addComponent("text");
    //    entity.addComponent("children");
    //    //我是一名游戏开发工程师。这里有一些关于我以及我感兴趣的信息与你分享。
    //    text.property.fillText = "我是一名游戏开发工程师";
    //    text.property.fontSize = 20;
    //    text.update();
    //    node.property.anchorPointX = 0.5;
    //    //node.property.anchorPointY = 0;
    //    node.property.width = text.property.width;
    //    node.property.height = text.property.height;
    //    node.update();
    //
    //    var event = entity.addComponent("event");
    //    sysEvent.listen(entity, "nameResize", function (aEvent) {
    //        //var scale = aEvent.width / text.property.width * 0.5;
    //        //node.property.scaleX = scale;
    //        //node.property.scaleY = scale;
    //        node.update();
    //        text.update();
    //
    //        //node.property.x = rootStage.components.node.property.width / 2;
    //        node.property.y = node.property.height * node.property.scaleY;
    //        node.update();
    //    });
    //    engine.manager.registerSystems.children.addChild(sentence2, entity);
    //    return entity;
    //}();
    //var sentence4 = function () {
    //    var entity = engine.manager.newEntity();
    //    var node = entity.addComponent("node");
    //    var text = entity.addComponent("text");
    //    entity.addComponent("children");
    //    //我是一名游戏开发工程师。这里有一些关于我以及我感兴趣的信息与你分享。
    //    text.property.fillText = "这里有一些关于我以及我感兴趣的信息与你分享";
    //    text.property.fontSize = 20;
    //    text.update();
    //    node.property.anchorPointX = 0.5;
    //    //node.property.anchorPointY = 0;
    //    node.property.width = text.property.width;
    //    node.property.height = text.property.height;
    //    node.update();
    //
    //    var event = entity.addComponent("event");
    //    sysEvent.listen(entity, "nameResize", function (aEvent) {
    //        //var scale = aEvent.width / text.property.width * 0.5;
    //        //node.property.scaleX = scale;
    //        //node.property.scaleY = scale;
    //        node.update();
    //        text.update();
    //
    //        //node.property.x = rootStage.components.node.property.width / 2;
    //        node.property.y = node.property.height * node.property.scaleY;
    //        node.update();
    //    });
    //    engine.manager.registerSystems.children.addChild(sentence3, entity);
    //    return entity;
    //}();
    //var sentence5 = function () {
    //    var entity = engine.manager.newEntity();
    //    var node = entity.addComponent("node");
    //    var text = entity.addComponent("text");
    //    //我是一名游戏开发工程师。这里有一些关于我以及我感兴趣的信息与你分享。
    //    text.property.fillText = "Enjoy yourself.";
    //    text.property.fontSize = 30;
    //    text.update();
    //    node.property.anchorPointX = 0.5;
    //    //node.property.anchorPointY = 0;
    //    node.property.width = text.property.width;
    //    node.property.height = text.property.height;
    //    node.update();
    //
    //    var event = entity.addComponent("event");
    //    sysEvent.listen(entity, "nameResize", function (aEvent) {
    //        //var scale = aEvent.width / text.property.width * 0.5;
    //        //node.property.scaleX = scale;
    //        //node.property.scaleY = scale;
    //        node.update();
    //        text.update();
    //
    //        //node.property.x = rootStage.components.node.property.width / 2;
    //        node.property.y = node.property.height * node.property.scaleY;
    //        node.update();
    //    });
    //    engine.manager.registerSystems.children.addChild(sentence4, entity);
    //    return entity;
    //}();
}