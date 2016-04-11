window.app = window.app || {};
app.about = function () {
    console.log("app.about")
    var rootScene = engine.manager.entitiesWithTag["rootScene"];
    var sysEvent = engine.manager.registerSystems.event;
    var root = function () {
        var entity = engine.manager.newEntity();
        entity.enabled = false;
        entity.setTag("about");
        var node = entity.addComponent("node");
        //node.property.alpha = 0.5;
        //node.update();
        entity.addComponent("children");
        //var rect = entity.addComponent("rect");
        //rect.property.fillColor = "#fff";
        //rect.property.width = 200;
        //rect.property.height = 25;
        //rect.update();
        engine.manager.registerSystems.children.addChild(rootScene, entity);
        var event = entity.addComponent("event");
        sysEvent.listen(entity, "rootSceneResize", function (aEvent) {
            //rect.property.width = aEvent.width * 0.9;
            //rect.property.height = aEvent.height * 0.85;
            //rect.update();
            //console.log("about",aEvent)
            node.property.x = aEvent.width * 0.05;
            node.property.y = aEvent.height * 0.1;
            node.property.width = aEvent.width * 0.9;
            node.property.height = aEvent.height * 0.85;
            node.update();
            sysEvent.dispatch(entity, "aboutResize", {
                width: node.property.width,
                height: node.property.height
            })
        });
        event.update();
        return entity;
    }();
    var head = function () {
        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");
        entity.setTag("head")
        entity.addComponent("children");
        var image = entity.addComponent("image");
        image.property.file = "assets/head.png";
        image.update();

        node.property.anchorPointY = 0;
        node.property.anchorPointX = 0.5;
        node.update();

        //处理尺寸变化
        var event = entity.addComponent("event");
        sysEvent.listen(entity, "aboutResize", function (aEvent) {
            //text.property.fontSize = root.components.node.property.width/20;
            //text.update();
            var scale = Math.min(aEvent.width / image.property.width * 0.4,aEvent.height / image.property.height * 0.2);
            node.property.scaleX = scale;
            node.property.scaleY = scale;
            node.property.x = aEvent.width / 2;
            node.property.width = image.property.width;
            node.property.height = image.property.height;

            node.update();
        });
        engine.manager.registerSystems.children.addChild(root, entity);
        return entity;
    }();
    var name = function () {
        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");
        entity.addComponent("children");
        var text = entity.addComponent("text");
        text.property.fillText = "姓名：廖望成";
        text.update();

        node.property.anchorPointY = 0;
        node.property.anchorPointX = 0.5;
        node.update();

        //处理尺寸变化
        var event = entity.addComponent("event");
        sysEvent.listen(entity, "aboutResize", function (aEvent) {
             var fontSize= Math.min(aEvent.width / 20,aEvent.height / 35)
            text.property.fontSize =fontSize;
            text.update();

            node.property.x = aEvent.width / 2;
            node.property.y = head.components.node.property.height * head.components.node.property.scaleY * 1.05;
            node.property.width = text.property.width;
            node.property.height = text.property.height;

            node.update();
        });
        engine.manager.registerSystems.children.addChild(root, entity);
        return entity;
    }();
    var sex = function () {
        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");
        entity.addComponent("children");
        var text = entity.addComponent("text");
        text.property.fillText = "性别：男";
        text.update();

        node.property.anchorPointY = 0;
        node.property.anchorPointX = 0.5;
        node.update();

        //处理尺寸变化
        var event = entity.addComponent("event");
        sysEvent.listen(entity, "aboutResize", function (aEvent) {
             var fontSize= Math.min(aEvent.width / 20,aEvent.height / 35)
            text.property.fontSize =fontSize;
            text.update();

            node.property.x = aEvent.width / 2;
            node.property.y = name.components.node.property.y + name.components.node.property.height * name.components.node.property.scaleY ;
            node.property.width = text.property.width;
            node.property.height = text.property.height;

            node.update();
        });
        engine.manager.registerSystems.children.addChild(root, entity);
        return entity;
    }();
    var age = function () {
        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");
        entity.addComponent("children");
        var text = entity.addComponent("text");
        text.property.fillText = "年龄：25（1991/03）";
        text.update();

        node.property.anchorPointY = 0;
        node.property.anchorPointX = 0.5;
        node.update();

        //处理尺寸变化
        var event = entity.addComponent("event");
        sysEvent.listen(entity, "aboutResize", function (aEvent) {
             var fontSize= Math.min(aEvent.width / 20,aEvent.height / 35)
            text.property.fontSize =fontSize;
            text.update();

            node.property.x = aEvent.width / 2;
            node.property.y = sex.components.node.property.y + sex.components.node.property.height * sex.components.node.property.scaleY ;
            node.property.width = text.property.width;
            node.property.height = text.property.height;

            node.update();
        });
        engine.manager.registerSystems.children.addChild(root, entity);
        return entity;
    }();
    var phone = function () {
        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");
        entity.addComponent("children");
        var text = entity.addComponent("text");
        text.property.fillText = "联系方式：18988967520";
        text.update();

        node.property.anchorPointY = 0;
        node.property.anchorPointX = 0.5;
        node.update();

        //处理尺寸变化
        var event = entity.addComponent("event");
        sysEvent.listen(entity, "aboutResize", function (aEvent) {
             var fontSize= Math.min(aEvent.width / 20,aEvent.height / 35)
            text.property.fontSize =fontSize;
            text.update();

            node.property.x = aEvent.width / 2;
            node.property.y = age.components.node.property.y + age.components.node.property.height * age.components.node.property.scaleY ;
            node.property.width = text.property.width;
            node.property.height = text.property.height;

            node.update();
        });
        engine.manager.registerSystems.children.addChild(root, entity);
        return entity;
    }();
    var email = function () {
        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");
        entity.addComponent("children");
        var text = entity.addComponent("text");
        text.property.fillText = "邮箱：402495814@qq.com";
        text.update();

        node.property.anchorPointY = 0;
        node.property.anchorPointX = 0.5;
        node.update();

        //处理尺寸变化
        var event = entity.addComponent("event");
        sysEvent.listen(entity, "aboutResize", function (aEvent) {
             var fontSize= Math.min(aEvent.width / 20,aEvent.height / 35)
            text.property.fontSize =fontSize;
            text.update();

            node.property.x = aEvent.width / 2;
            node.property.y = phone.components.node.property.y + phone.components.node.property.height * phone.components.node.property.scaleY ;
            node.property.width = text.property.width;
            node.property.height = text.property.height;

            node.update();
        });
        engine.manager.registerSystems.children.addChild(root, entity);
        return entity;
    }();
    var address = function () {
        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");
        entity.addComponent("children");
        var text = entity.addComponent("text");
        text.property.fillText = "住址：广州市天河区龙口东路";
        text.update();

        node.property.anchorPointY = 0;
        node.property.anchorPointX = 0.5;
        node.update();

        //处理尺寸变化
        var event = entity.addComponent("event");
        sysEvent.listen(entity, "aboutResize", function (aEvent) {
             var fontSize= Math.min(aEvent.width / 20,aEvent.height / 35)
            text.property.fontSize =fontSize;
            text.update();

            node.property.x = aEvent.width / 2;
            node.property.y = email.components.node.property.y + email.components.node.property.height * email.components.node.property.scaleY ;
            node.property.width = text.property.width;
            node.property.height = text.property.height;

            node.update();
        });
        engine.manager.registerSystems.children.addChild(root, entity);
        return entity;
    }();
    var info = function () {
        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");
        entity.addComponent("children");
        var text = entity.addComponent("text");
        text.property.fillText = "其他：热爱APP/Html5游戏开发工作，目前擅长2D游戏项目。Cocos引擎运用熟练，可以根据项目需要使用C++、Lua、JavaScript这3种语言混合开发。Egret引擎运用熟练，可以开发各类Html5游戏。能模拟服务器（Node.js/Go）以及数据库（MongoDB），搭建复杂项目的测试开发环境。\n" +
            "        对于游戏引擎的运作方式有一定的理解，目前开发了一套基于Html5 Canvas的游戏渲染框架，当前的主页由此框架开发。虽然市面上已经有了很多优秀的游戏引擎，但仍希望通过开发一套游戏引擎的方式，来记录自身的理解与成长。";
        text.update();

        node.property.anchorPointY = 0;
        node.property.anchorPointX = 0.5;
        node.update();

        //处理尺寸变化
        var event = entity.addComponent("event");
        sysEvent.listen(entity, "aboutResize", function (aEvent) {
            var fontSize= Math.min(aEvent.width / 20,aEvent.height / 35)
            text.property.fontSize =fontSize;
            text.property.frameWidth = aEvent.width ;
            text.update();

            node.property.x = aEvent.width / 2;
            node.property.y = address.components.node.property.y + address.components.node.property.height * address.components.node.property.scaleY ;
            node.property.width = text.property.width;
            node.property.height = text.property.height;

            node.update();
        });
        engine.manager.registerSystems.children.addChild(root, entity);
        return entity;
    }();
}