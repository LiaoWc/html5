window.app = window.app || {};
app.works = function () {
    console.log("app.works")
    var rootStage = engine.manager.entitiesWithTag["rootStage"];
    var sysEvent = engine.manager.registerSystems.event;
    var root = function () {
        var entity = engine.manager.newEntity();
        entity.setTag("skill");
        var node = entity.addComponent("node");
        node.property.alpha = 0.5;
        node.update();
        entity.addComponent("children");
        var rect = entity.addComponent("rect");
        rect.property.fillColor = "#fff";
        rect.property.width = 200;
        rect.property.height = 25;
        rect.update();
        engine.manager.registerSystems.children.addChild(rootStage, entity);
        var event = entity.addComponent("event");
        sysEvent.listen(entity, "rootStageResize", function (aEvent) {
            rect.property.width = aEvent.width * 0.9;
            rect.property.height = aEvent.height * 0.85;
            rect.update();
            node.property.x = aEvent.width * 0.05;
            node.property.y = aEvent.height * 0.13;
            node.property.width = aEvent.width * 0.9;
            node.property.height = aEvent.height * 0.85;
            node.update();
            sysEvent.dispatch(entity, "rootResize", {
                width: node.property.width,
                height: node.property.height
            })

        });
        return entity;
    }();
    var tips = function () {
        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");

        entity.addComponent("children");
        var text = entity.addComponent("text");
        text.property.fillText = "(PS:微信中长按二维码识别后，可以立即体验哦~)";
        text.property.fontSize = 20;
        text.property.fontColor = "#f8c58f";
        //text.property.frameWidth = 400;
        //text.property.fontFamily = "system";
        text.update();
        //maxWidth = Math.max(maxWidth, text.property.width);
        //node.property.y = root.components.node.property.height / (items.length) * number;
        node.property.width = text.property.width;
        node.property.height = text.property.height;
        node.property.anchorPointY = 1;
        node.property.anchorPointX = 0.5;

        //node.property.anchorPointY = 0.5;
        node.update();


        //处理尺寸变化
        var event = entity.addComponent("event");
        sysEvent.listen(entity, "rootResize", function (aEvent) {
            var space = root.components.node.property.height / items.length;
            if (space < 120) {
                text.property.fontSize = 14 * space / 120;
            }
            text.update();
            //space = root.com   /ponents.node.property.height / items.length;
            //node.property.x = text.property.width * node.property.scaleX;
            node.property.x = aEvent.width/2;
            node.property.width = text.property.width;
            node.property.height = text.property.height;
            //node.property.y = space * (number + 0.5) - qrcodeImage.components.node.property.height * 0.5 * qrcodeImage.components.node.property.scaleX;
            node.update();
            //console.log(aEvent.width,node.property.x,aEvent.width - node.property.x)
            //text.property.frameWidth = aEvent.width - node.property.x;

        });
        engine.manager.registerSystems.children.addChild(root, entity);
        return entity;
    }();
    var items = [
        {name: "炫酷荧光跑", info: "竖屏跑酷游戏，使用Cocos2d-js开发，利用Spine的特性使主角在奔跑过程中捡到某些物品会发生变装。"},
        {name: "锋味迷宫", info: "使用Cocos2d-js开发，利用Box2d构建迷宫，通过重力感应控制小球，在迷宫中收集物品。"},
        {name: "冰霜来袭", info: "使用Cocos2d-js开发，一款精致的堆箱子游戏，背景会随着游戏的进度产生多种变化。"},
        {name: "脆脆鲨食神", info: "使用Egret开发，声音、动画、交互都比较完整的项目,用于产品介绍。"},
        {name: "走心的甜蜜", info: "使用Egret开发，包含照片的编辑、上传、分享等功能,用于产品推广。"},
    ];
    var maxWidth = 0;
    var createItem = function (args) {
        var number = args.number;
        var name = args.name;
        var info = args.info;


        var qrcodeImage = function () {
            var entity = engine.manager.newEntity();
            var node = entity.addComponent("node");
            node.property.anchorPointX = 1;
            entity.addComponent("children");
            var image = entity.addComponent("image");
            image.property.file = "assets/qrcode1.png";
            image.update();

            node.property.width = image.property.width;
            node.property.height = image.property.height;
            node.property.anchorPointY = 0.5;

            node.update();


            //处理尺寸变化
            var event = entity.addComponent("event");
            sysEvent.listen(entity, "rootResize", function (aEvent) {
                var height = root.components.node.property.height / items.length * 0.8;
                var space = root.components.node.property.height / items.length;
                //if (space < 50) {
                //    node.property.scaleX = space / 50;
                //    node.property.scaleY = space / 50;
                //}
                //space = root.components.node.property.height / items.length;
                ////node.property.x = text.property.width * node.property.scaleX;
                var scale = height / image.property.height;
                node.property.scaleX = scale;
                node.property.scaleY = scale;
                node.property.x = height
                node.property.y = space * (number + 0.5);
                //node.update();
            });
            engine.manager.registerSystems.children.addChild(root, entity);
            return entity;
        }();

        var nameText = function () {
            var entity = engine.manager.newEntity();
            var node = entity.addComponent("node");

            entity.addComponent("children");
            var text = entity.addComponent("text");
            text.property.fillText = "名称：" + name + "\n" +
                "简介：" + info;
            text.property.fontSize = 14;
            //text.property.frameWidth = 400;
            //text.property.fontFamily = "system";
            text.update();
            //maxWidth = Math.max(maxWidth, text.property.width);
            //node.property.y = root.components.node.property.height / (items.length) * number;
            node.property.width = text.property.width;
            node.property.height = text.property.height;
            node.property.anchorPointY = 0;
            node.property.anchorPointX = 0;

            //node.property.anchorPointY = 0.5;
            node.update();


            //处理尺寸变化
            var event = entity.addComponent("event");
            sysEvent.listen(entity, "rootResize", function (aEvent) {
                var space = root.components.node.property.height / items.length;
                if (space < 100) {
                    text.property.fontSize = 14 * space / 100;
                    //node.property.scaleX = space / 100;
                    //node.property.scaleY = space / 100;
                }
                space = root.components.node.property.height / items.length;
                //node.property.x = text.property.width * node.property.scaleX;
                node.property.x = qrcodeImage.components.node.property.width * qrcodeImage.components.node.property.scaleX * 1.1;
                node.property.y = space * (number + 0.5) - qrcodeImage.components.node.property.height * 0.5 * qrcodeImage.components.node.property.scaleX;
                node.update();
                //console.log(aEvent.width,node.property.x,aEvent.width - node.property.x)
                text.property.frameWidth = aEvent.width - node.property.x;
                text.update();
            });
            engine.manager.registerSystems.children.addChild(root, entity);
            return entity;
        }();


    };

    for (var i = 0, len = items.length; i < len; i++) {
        var item = items[i];
        createItem({
            number: i,
            name: item.name,
            info: item.info,
        })

    }
    //for (var i = 0, len = items.length; i < len; i++) {
    //    var item = items[i];
    //
    //}

    //var bg = function () {
    //    var entity = engine.manager.newEntity();
    //    var node = entity.addComponent("node");
    //    entity.addComponent("children");
    //    var rect = entity.addComponent("rect");
    //    rect.property.fillColor = "#333";
    //    rect.property.width = 200;
    //    rect.property.height = 25;
    //    //rect.property.fontFamily = "system";
    //    rect.update();
    //
    //    node.property.width = rect.property.width;
    //    node.property.height = rect.property.height;
    //    //node.property.anchorPointX = 1;
    //    node.update();
    //
    //
    //    //处理尺寸变化
    //    var event = entity.addComponent("event");
    //    sysEvent.listen(entity, "rootStageResize", function (aEvent) {
    //        var scale = Math.min(aEvent.width * 0.002, aEvent.height * 0.0015);
    //        //var fontSize = Math.min(aEvent.width * 0.04, aEvent.height * 0.03);
    //        //node.property.x = aEvent.width * 0.1;
    //        //node.property.y = aEvent.height * 0.1;
    //        //text.property.fontSize = fontSize;
    //        //text.update();
    //        node.property.x = name.components.node.property.width * 1.2;
    //        //var scaleX = aEvent.width * 0.2 / text.property.width;
    //        //var scaleY = aEvent.height * 0.2 / text.property.height;
    //        //var scale = Math.min(scaleX, scaleY);
    //        node.property.scaleX = scale;
    //        node.property.scaleY = scale;
    //        node.update();
    //        //sysEvent.dispatch(entity, "headResize", {
    //        //    scale: scale
    //        //})
    //    });
    //    engine.manager.registerSystems.children.addChild(name, entity);
    //    return entity;
    //}();

}