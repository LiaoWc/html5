window.app = window.app || {};
app.resume = function () {
    console.log("app.resume")
    var rootStage = engine.manager.entitiesWithTag["rootStage"];
    var sysEvent = engine.manager.registerSystems.event;
    var root = function () {
        var entity = engine.manager.newEntity();
        var comNode = entity.addComponent("node");
        entity.addComponent("children");
        engine.manager.registerSystems.children.addChild(rootStage, entity);
        return entity;
    }();
    var head = function () {
        var entity = engine.manager.newEntity();
        var comNode = entity.addComponent("node");
        entity.addComponent("children");
        //console.log(rootStage.components.node.property.height)

        //entity.addComponent("children");
        var comImage = entity.addComponent("image");
        comImage.property.file = "assets/head.png";
        comImage.update();
        comNode.property.width = comImage.property.width;
        comNode.property.height = comImage.property.height;
        comNode.property.anchorPointX = 0.5;
        comNode.property.anchorPointY = 0;
        //var scaleX = rootStage.components.node.property.width / comImage.property.width;
        //var scaleY = rootStage.components.node.property.height / comImage.property.height;
        //var scale = Math.max(scaleX, scaleY);
        //comNode.property.scaleX = 0.5;
        //comNode.property.scaleY = 0.5;
        //comNode.property.rotation = 0;
        comNode.update();

        //处理尺寸变化
        var event = entity.addComponent("event");
        sysEvent.listen(entity, "rootStageResize", function (aEvent) {
            comNode.property.x = aEvent.width / 2;
            comNode.property.y = aEvent.height * 0.1;
            var scaleX = aEvent.width * 0.2 / comImage.property.width;
            var scaleY = aEvent.height * 0.2 / comImage.property.height;
            var scale = Math.min(scaleX, scaleY);
            comNode.property.scaleX = scale;
            comNode.property.scaleY = scale;
            sysEvent.dispatch(entity, "headResize", {
                scale: scale
            })
        });
        engine.manager.registerSystems.children.addChild(root, entity);
        return entity;
    }();
    //
    var name = function () {
        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");
        var children = entity.addComponent("children");
        node.property.anchorPointX = 0.5;
        var text = entity.addComponent("text");
        text.property.fillText = "姓名：廖望成";
        //text.property.fontFamily = "system";
        text.property.fontSize = 30;
        text.update();
        node.property.y = 210;
        node.property.width = text.property.width;
        node.property.height = text.property.height;
        node.update();
        //var event = entity.addComponent("event");
        //sysEvent.listen(entity, "headResize", function (aEvent) {
        //    node.property.width = text.property.width;
        //    node.property.height = text.property.height;
        //    //node.property.x = aEvent.width / 2;
        //    node.property.y = 220;
        //    node.update();
        //});

        engine.manager.registerSystems.children.addChild(head, entity);
        return entity;
    }();
    var sex = function () {
        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");
        var children = entity.addComponent("children");
        node.property.anchorPointX = 0.5;
        var text = entity.addComponent("text");
        text.property.fillText = "性别：男";
        text.property.fontSize = 30;
        //text.property.fontFamily = "system";
        text.update();
        node.property.y = 40;
        node.property.width = text.property.width;
        node.property.height = text.property.height;
        node.update();
        engine.manager.registerSystems.children.addChild(name, entity);
        return entity;
    }();
    var age = function () {
        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");
        var children = entity.addComponent("children");
        node.property.anchorPointX = 0.5;
        var text = entity.addComponent("text");
        text.property.fillText = "年龄：25";
        text.property.fontSize = 30;
        //text.property.fontFamily = "system";
        text.update();
        node.property.y = 40;
        node.property.width = text.property.width;
        node.property.height = text.property.height;
        node.update();
        engine.manager.registerSystems.children.addChild(sex, entity);
        return entity;
    }();
    var graduate = function () {
        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");
        var children = entity.addComponent("children");
        node.property.anchorPointX = 0.5;
        var text = entity.addComponent("text");
        text.property.fillText = "学历：本科（东华理工大学软件学院）";
        text.property.fontSize = 30;
        //text.property.fontFamily = "system";
        text.update();
        node.property.y = 40;
        node.property.width = text.property.width;
        node.property.height = text.property.height;
        node.update();
        engine.manager.registerSystems.children.addChild(age, entity);
        return entity;
    }();
    var works = function () {
        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");
        var children = entity.addComponent("children");
        node.property.anchorPointX = 0.5;
        var text = entity.addComponent("text");
        text.property.fillText = "工作经历：2013年3月至2015年1月，在广州元曜软件有限公司实习后入职。" +
            "期间主要负责两款手机游戏的开发工作：一款儿童类小游戏[可乐鸡]，使用coco2dx-js开发，用时一个月，在豌豆荚上线；" +
            "一款卡牌竞技类游戏[叫我妖怪]，最终玩法类似现在的[炉石传说]，使用coco2dx-lua开发，用时一年，但由于各种原因，最终未能完成。\n\n" +
            "2015年3月至2015年9月，入职广州互动派传媒科技股份有限公司，负责微信Html5游戏开发，主要使用coco2dx-js和egret两款引擎，相关项目可以在作品中查看，并扫描二维码体验。\n\n" +
            "2015年9月至今，在家整理知识，期间完成数个外包，并开发了一款基于Html5 Canvas的游戏框架，当前的网页使用此框架开发。";
        text.property.fontSize = 30;
        text.property.frameWidth = 700;
        //text.property.fontFamily = "system";
        text.update();
        node.property.y = 40;
        node.property.width = text.property.width;
        node.property.height = text.property.height;
        node.update();
        engine.manager.registerSystems.children.addChild(graduate, entity);
        return entity;
    }();
    //
    //var sentence2 = function () {
    //    var entity = engine.manager.newEntity();
    //    var node = entity.addComponent("node");
    //    var children = entity.addComponent("children");
    //
    //    node.property.anchorPointX = 0.5;
    //    node.property.anchorPointY = 0;
    //
    //    var text = entity.addComponent("text");
    //    text.property.fillText = "欢迎来到我的个人主页";
    //    text.property.fontSize = 25;
    //    text.update();
    //
    //    var event = entity.addComponent("event");
    //    sysEvent.listen(entity, "rootStageResize", function (aEvent) {
    //        var fontSize = Math.min(aEvent.width * 0.1, aEvent.height * 0.1);
    //        text.property.fontSize = fontSize / 3;
    //        text.update();
    //        node.property.y = text.property.height * 1.4;
    //        node.property.width = text.property.width;
    //        node.property.height = text.property.height;
    //        node.update();
    //    });
    //
    //    engine.manager.registerSystems.children.addChild(sentence1, entity);
    //    return entity;
    //}();
    //var sentence3 = function () {
    //    var entity = engine.manager.newEntity();
    //    var node = entity.addComponent("node");
    //    var children = entity.addComponent("children");
    //    node.property.y = 40;
    //    node.property.anchorPointX = 0.5;
    //    node.property.anchorPointY = 0;
    //
    //    var text = entity.addComponent("text");
    //    text.property.fillText = "我是一名游戏开发工程师";
    //    text.property.fontSize = 25;
    //    text.update();
    //
    //    var event = entity.addComponent("event");
    //    sysEvent.listen(entity, "rootStageResize", function (aEvent) {
    //        var fontSize = Math.min(aEvent.width * 0.1, aEvent.height * 0.1);
    //        text.property.fontSize = fontSize / 3;
    //        text.update();
    //        node.property.y = text.property.height * 1.4;
    //        node.property.width = text.property.width;
    //        node.property.height = text.property.height;
    //        node.update();
    //    });
    //
    //    engine.manager.registerSystems.children.addChild(sentence2, entity);
    //    return entity;
    //}();
    //var sentence4 = function () {
    //    var entity = engine.manager.newEntity();
    //    var node = entity.addComponent("node");
    //    var children = entity.addComponent("children");
    //    node.property.y = 40;
    //    node.property.anchorPointX = 0.5;
    //    node.property.anchorPointY = 0;
    //
    //    var text = entity.addComponent("text");
    //    text.property.fillText = "这里有一些关于我以及我感兴趣的信息与你分享";
    //    text.property.fontSize = 25;
    //    text.update();
    //
    //    var event = entity.addComponent("event");
    //    sysEvent.listen(entity, "rootStageResize", function (aEvent) {
    //        var fontSize = Math.min(aEvent.width * 0.1, aEvent.height * 0.1);
    //        text.property.fontSize = fontSize / 3;
    //        text.update();
    //        node.property.y = text.property.height * 1.4;
    //        node.property.width = text.property.width;
    //        node.property.height = text.property.height;
    //        node.update();
    //    });
    //
    //    engine.manager.registerSystems.children.addChild(sentence3, entity);
    //    return entity;
    //}();
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
    //    sysEvent.listen(entity, "rootStageResize", function (aEvent) {
    //        var fontSize = Math.min(aEvent.width * 0.1, aEvent.height * 0.1);
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