window.app = window.app || {};
app.skill = function () {
    console.log("app.skill")
    var rootStage = engine.manager.entitiesWithTag["rootStage"];
    var sysEvent = engine.manager.registerSystems.event;
    var root = function () {
        var entity = engine.manager.newEntity();
        entity.setTag("skill");
        var node = entity.addComponent("node");
        node.property.alpha = 0.5;

        node.update();
        entity.addComponent("children");
        //var rect = entity.addComponent("rect");
        //rect.property.fillColor = "#fff";
        //rect.property.width = 200;
        //rect.property.height = 25;
        //rect.property.fontFamily = "system";
        //rect.update();
        engine.manager.registerSystems.children.addChild(rootStage, entity);
        var event = entity.addComponent("event");
        sysEvent.listen(entity, "rootStageResize", function (aEvent) {
            //rect.property.width = aEvent.width * 0.9;
            //rect.property.height = aEvent.height * 0.8;
            //rect.update();
            node.property.x = aEvent.width * 0.05;
            node.property.y = aEvent.height * 0.1;
            node.property.width = aEvent.width * 0.9;
            node.property.height = aEvent.height * 0.8;
            node.update();
            sysEvent.dispatch(entity, "rootResize", {
                width: node.property.width,
                height: node.property.height
            })

        });
        return entity;
    }();
    var items = [
        {name: "Cocos", value: 0.9},
        {name: "Egret", value: 0.9},
        {name: "JavaScript", value: 0.85},
        {name: "Lua", value: 0.85},
        {name: "C/C++", value: 0.8},
        {name: "Node.JS", value: 0.7},
        {name: "MongoDB", value: 0.5},
        {name: "Go", value: 0.5},
    ];
    var maxWidth = 0;
    var createItem = function (args) {
        var number = args.number;
        var name = args.name;
        var value = args.value;
        var nameText = function () {
            var entity = engine.manager.newEntity();
            var node = entity.addComponent("node");
            node.property.anchorPointX = 1;
            entity.addComponent("children");
            var text = entity.addComponent("text");
            text.property.fillText = name;
            text.property.fontSize = 15;
            text.property.fontFamily = "system";
            text.update();
            maxWidth = Math.max(maxWidth, text.property.width);
            //node.property.y = root.components.node.property.height / (items.length) * number;
            node.property.width = text.property.width;
            node.property.height = text.property.height;
            node.property.anchorPointY = 0.5;
            node.update();


            //处理尺寸变化
            var event = entity.addComponent("event");
            sysEvent.listen(entity, "rootResize", function (aEvent) {
                var space = root.components.node.property.height / items.length;
                if (space < 50) {
                    node.property.scaleX = space / 50;
                    node.property.scaleY = space / 50;
                }
                space = root.components.node.property.height / items.length;
                //node.property.x = text.property.width * node.property.scaleX;
                node.property.x = maxWidth * node.property.scaleX;
                node.property.y = space * (number + 0.5);
                node.update();
            });
            engine.manager.registerSystems.children.addChild(root, entity);
            return entity;
        }();

        var bottomRect = function () {
            var entity = engine.manager.newEntity();
            var node = entity.addComponent("node");
            //node.property.anchorPointX = 1;
            entity.addComponent("children");
            var rect = entity.addComponent("rect");
            rect.property.width = 123;
            rect.property.height = 15;
            rect.update();

            node.property.width = rect.property.width;
            node.property.height = rect.property.height;
            node.property.anchorPointY = 0.5;
            node.update();


            //处理尺寸变化
            var event = entity.addComponent("event");
            sysEvent.listen(entity, "rootResize", function (aEvent) {
                rect.property.width = (aEvent.width - maxWidth) * 0.95;
                rect.property.height = nameText.components.text.property.height * 1.3;
                rect.update();
                node.property.x = (aEvent.width - maxWidth) * 0.025;
                node.property.width = rect.property.width;
                node.property.height = rect.property.height;
                node.update();
            });
            engine.manager.registerSystems.children.addChild(nameText, entity);
            return entity;
        }();
        var valueRect = function () {
            var entity = engine.manager.newEntity();
            var node = entity.addComponent("node");
            //node.property.anchorPointX = 1;
            entity.addComponent("children");
            var rect = entity.addComponent("rect");
            //rect.property.width = 123;
            //rect.property.height = 15;
            rect.property.fillColor = "#fff"
            rect.update();
            //node.property.alpha = 0.5;
            node.property.width = rect.property.width;
            node.property.height = rect.property.height;
            node.property.anchorPointY = 0.5;
            node.update();


            //处理尺寸变化
            var event = entity.addComponent("event");
            sysEvent.listen(entity, "rootResize", function (aEvent) {
                rect.property.width = (aEvent.width - maxWidth) * 0.95 * value;
                rect.property.height = nameText.components.text.property.height * 1.3;
                rect.update();
                //node.property.x = (aEvent.width - maxWidth) * 0.025;
                node.property.width = rect.property.width;
                node.property.height = rect.property.height;
                node.update();
            });
            engine.manager.registerSystems.children.addChild(bottomRect, entity);
            return entity;
        }();

    };

    for (var i = 0, len = items.length; i < len; i++) {
        var item = items[i];
        createItem({
            number: i,
            name: item.name,
            value: item.value,
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