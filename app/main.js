window.app = window.app || {};
app.main = function () {
    console.log("app.main")
    var rootStage = engine.manager.entitiesWithTag["rootStage"];
    var sysEvent = engine.manager.registerSystems.event;
    var ent1 = function () {
        var entity = engine.manager.newEntity();
        var comNode = entity.addComponent("node");
        entity.addComponent("children");
        comNode.property.anchorPointX = 0.5;
        comNode.property.anchorPointY = 0.5;
        //comNode.property.rotation = 45;
        comNode.update();
        entity.addComponent("children");
        var text = entity.addComponent("text");
        text.property.fillText = "I'm Liao Wangcheng.";
        text.property.fontSize = 25;
        text.property.fontColor = "#f00";
        //text.property.fontFamily = "MFYueYuan_Noncommercial-Regular"
        text.update();
        comNode.property.width = text.property.width;
        comNode.property.height = text.property.height;
        comNode.update();
        console.log(text.property.width)

        engine.manager.registerSystems.children.addChild(rootStage, entity);
        var event = entity.addComponent("event");
        sysEvent.listen(entity, "rootStageResize", function (aEvent) {
            var scaleX = rootStage.components.node.property.width * 0.8 / text.property.width;
            var scaleY = rootStage.components.node.property.height * 0.15 / text.property.height;
            var scale = Math.min(scaleX, scaleY);
            text.property.fontSize = 25 * scale;
            text.update();
            comNode.property.x = aEvent.width / 2;
            comNode.property.y = aEvent.height / 2;
            comNode.property.width = text.property.width;
            comNode.property.height = text.property.height;
            comNode.update();
        });

        return entity;
    }();

    var ent1 = function () {
        var entity = engine.manager.newEntity();
        var comNode = entity.addComponent("node");
        entity.addComponent("children");
        comNode.property.anchorPointX = 0.5;
        comNode.property.anchorPointY = 0.5;
        comNode.property.scaleX = 2;
        comNode.property.scaleY = 2;
        //comNode.property.rotation = 45;
        comNode.update();
        entity.addComponent("children");
        var text = entity.addComponent("text");
        text.property.fillText = "I'm Liao Wangcheng.";
        text.property.fontSize = 25 / 2;
        text.property.fontColor = "#f00";
        //text.property.fontFamily = "MFYueYuan_Noncommercial-Regular"
        text.update();
        comNode.property.width = text.property.width;
        comNode.property.height = text.property.height;
        comNode.update();
        console.log(text.property.width)

        engine.manager.registerSystems.children.addChild(rootStage, entity);
        var event = entity.addComponent("event");
        sysEvent.listen(entity, "rootStageResize", function (aEvent) {
            var scaleX = rootStage.components.node.property.width * 0.8 / text.property.width;
            var scaleY = rootStage.components.node.property.height * 0.15 / text.property.height;
            var scale = Math.min(scaleX, scaleY);
            text.property.fontSize = 25 * scale;
            text.update();
            comNode.property.x = aEvent.width / 2;
            comNode.property.y = aEvent.height / 4;
            comNode.property.width = text.property.width;
            comNode.property.height = text.property.height;
            comNode.update();
        });

        return entity;
    }();


}