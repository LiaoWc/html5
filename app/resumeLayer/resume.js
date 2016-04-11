window.app = window.app || {};
app.resume = function () {
    console.log("app.resume")
    var rootScene = engine.manager.entitiesWithTag["rootScene"];
    var sysEvent = engine.manager.registerSystems.event;
    var root = function () {
        var entity = engine.manager.newEntity();
        entity.setTag("resume");
        entity.enabled = false;
        var node = entity.addComponent("node");
        //node.property.alpha = 0.5;
        //node.update();
        entity.addComponent("children");
        var rect = entity.addComponent("rect");
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
            node.property.x = aEvent.width * 0.05;
            node.property.y = aEvent.height * 0.1;
            node.property.width = aEvent.width * 0.9;
            node.property.height = aEvent.height * 0.85;
            node.update();
            sysEvent.dispatch(entity, "resumeResize", {
                width: node.property.width,
                height: node.property.height
            })

        });
        return entity;
    }();

    var info = function () {
        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");
        entity.addComponent("children");
        var text = entity.addComponent("text");
        text.property.spaceY = 10;
        text.property.fontColor = "#fff"
        text.property.fillText = "2009年至2013年，就读于东华理工大学软件学院，获本科学士学位。\n\n" +
            "2013年3月至2015年1月，在广州元曜软件有限公司实习后入职。" +
            "期间先学习游戏开发相关知识与工具，后负责两款手机游戏的开发工作：一款儿童类小游戏[可乐鸡]，使用coco2dx-js开发，用时一个月，在豌豆荚上线；" +
            "一款卡牌竞技类游戏[叫我妖怪]，最终玩法类似现在的[炉石传说]，使用coco2dx-lua开发，用时一年，但由于公司发展方向，人员调整等因素，最终未能全部完成。\n\n" +
            "2015年3月至2015年9月，入职广州互动派传媒科技股份有限公司，负责微信Html5游戏开发，主要使用coco2dx-js和egret两款引擎，相关项目可以在作品中查看。\n\n" +
            "2015年9月至今，在家整理知识，期间完成数个外包，并开发了一款基于Html5 Canvas的游戏框架，当前的网页使用此框架开发。";
        text.update();

        node.property.anchorPointY = 0;
        node.property.anchorPointX = 0.5;
        node.update();

        //处理尺寸变化
        var event = entity.addComponent("event");
        sysEvent.listen(entity, "resumeResize", function (aEvent) {
            var fontSize= Math.min(aEvent.width / 20,aEvent.height / 32)
            text.property.fontSize =fontSize;
            text.property.frameWidth = aEvent.width ;
            text.update();

            node.property.x = aEvent.width / 2;
            //node.property.y = address.components.node.property.y + address.components.node.property.height * address.components.node.property.scaleY ;
            node.property.width = text.property.width;
            node.property.height = text.property.height;

            node.update();
        });
        engine.manager.registerSystems.children.addChild(root, entity);
        return entity;
    }();


}