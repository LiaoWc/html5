window.app = window.app || {};
app.home = function () {
    console.log("app.home")
    var rootScene = engine.manager.entitiesWithTag["rootScene"];
    var sysEvent = engine.manager.registerSystems.event;
    var root = function () {
        var entity = engine.manager.newEntity();
        entity.setTag("home");
        entity.enabled = false;
        var comNode = entity.addComponent("node");

        entity.addComponent("children");

        comNode.property.alpha = 0;
        comNode.update();
        var action = entity.addComponent("action");

        action.property.add = true;
        action.property.duration = 2000;
        action.update();

        action.property.add = true;
        action.property.duration = 1000;
        action.property.callback = function (args) {
            comNode.property.alpha = args.value;
            comNode.update();
        };
        action.property.run = true;
        action.update();
        engine.manager.registerSystems.children.addChild(rootScene, entity);
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
        text.property.fillText = "广州明朝互动科技股份有限公司\n";
        text.property.fontWeight = "bold";
        text.property.fontSize = 25;
        text.update();

        var event = entity.addComponent("event");
        sysEvent.listen(entity, "rootSceneResize", function (aEvent) {
            var fontSize = Math.min(aEvent.width * 0.09*0.7, aEvent.height * 0.12*0.7);
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
        text.property.fillText = "你好，欢迎来到我的个人主页。";
        text.property.fontSize = 25;
        text.update();

        var event = entity.addComponent("event");
        sysEvent.listen(entity, "rootSceneResize", function (aEvent) {
            var fontSize = Math.min(aEvent.width * 0.12, aEvent.height * 0.12);
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
        text.property.fillText = "我是一名游戏开发工程师，";
        text.property.fontSize = 25;
        text.update();

        var event = entity.addComponent("event");
        sysEvent.listen(entity, "rootSceneResize", function (aEvent) {
            var fontSize = Math.min(aEvent.width * 0.12, aEvent.height * 0.12);
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
        text.property.fillText = "对贵公司cocos2d-x高级开发工程师一职很感兴趣，";
        text.property.fontSize = 25;
        text.update();

        var event = entity.addComponent("event");
        sysEvent.listen(entity, "rootSceneResize", function (aEvent) {
            var fontSize = Math.min(aEvent.width * 0.12, aEvent.height * 0.12);
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
        text.property.fillText = "这里有一些关于我以及我感兴趣的信息与你分享。";
        text.property.fontSize = 25;
        text.update();

        var event = entity.addComponent("event");
        sysEvent.listen(entity, "rootSceneResize", function (aEvent) {
            var fontSize = Math.min(aEvent.width * 0.12, aEvent.height * 0.12);
            text.property.fontSize = fontSize / 3;
            text.update();
            node.property.y = text.property.height * 1.4;
            node.property.width = text.property.width;
            node.property.height = text.property.height;
            node.update();
        });

        engine.manager.registerSystems.children.addChild(sentence4, entity);
        return entity;
    }();
    //var sentence5 = function () {
    //    var entity = engine.manager.newEntity();
    //    var node = entity.addComponent("node");
    //    var children = entity.addComponent("children");
    //    node.property.y = 40;
    //    node.property.anchorPointX = 0.5;
    //    node.property.anchorPointY = 0;
    //
    //    var text = entity.addComponent("text");
    //    text.property.fillText = "Just enjoy yourself,please.";
    //    text.property.fontSize = 25;
    //    text.update();
    //
    //    var event = entity.addComponent("event");
    //    sysEvent.listen(entity, "rootSceneResize", function (aEvent) {
    //        var fontSize = Math.min(aEvent.width * 0.12, aEvent.height * 0.12);
    //        text.property.fontSize = fontSize / 2;
    //        text.update();
    //        node.property.y = text.property.height * 1.4;
    //        node.property.width = text.property.width;
    //        node.property.height = text.property.height;
    //        node.update();
    //    });
    //
    //    engine.manager.registerSystems.children.addChild(sentence4, entity);
    //    return entity;
    //}();

}