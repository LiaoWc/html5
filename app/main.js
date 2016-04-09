window.app = window.app || {};
app.main = function () {
    console.log("app.main")
    var mainScene = engine.manager.entitiesWithTag["mainScene"];
    var ent1 = function () {
        var entity = engine.manager.newEntity();
        var comNode = entity.addComponent("node");
        comNode.property.x = 256 / 2;
        comNode.property.y = 256 / 2;
        comNode.property.width = 256;
        comNode.property.height = 256;
        comNode.property.anchorPointX = 0.5;
        comNode.property.anchorPointY = 0.5;
        //comNode.property.rotation = 45;
        comNode.update();
        entity.addComponent("children");
<<<<<<< HEAD
        var text = entity.addComponent("text");
        text.property.fillText = "I'm Liao Wangcheng.";
        text.property.fontSize = 25;
        text.property.fontColor = "#f00";
        text.property.frameWidth = 100;
        //text.property.fontFamily = "MFYueYuan_Noncommercial-Regular"
        text.update();
        comNode.property.width = text.property.width;
        comNode.property.height = text.property.height;
        comNode.update();
        console.log(text.property.width)

        engine.manager.registerSystems.children.addChild(rootStage, entity);
        var event = entity.addComponent("event");
        sysEvent.listen(entity, "rootStageResize", function (aEvent) {
            //var scaleX = rootStage.components.node.property.width * 0.8 / text.property.width;
            //var scaleY = rootStage.components.node.property.height * 0.15 / text.property.height;
            //var scale = Math.min(scaleX, scaleY);
            //text.property.fontSize = 25 * scale;

            //text.update();
            comNode.property.x = aEvent.width / 2;
            comNode.property.y = aEvent.height / 2;
            comNode.property.width = text.property.width;
            comNode.property.height = text.property.height;
            comNode.update();
        });
=======
        var comImage = entity.addComponent("image");
        comImage.property.file = "assets/bgTile.png";
        comImage.update();
>>>>>>> parent of c361068... 0408

        engine.manager.registerSystems.children.addChild(mainScene, entity);
        return entity;
    }();
    var ent2 = function () {
        var entity = engine.manager.newEntity();
        var comNode = entity.addComponent("node");
        comNode.property.x = 256;
        comNode.property.y = 256;
        comNode.property.width = 256;
        comNode.property.height = 256;
        comNode.property.anchorPointX = 0.5;
        comNode.property.anchorPointY = 0.5;
        comNode.property.rotation = 0;
        comNode.update();
<<<<<<< HEAD
        entity.addComponent("children");
        var text = entity.addComponent("text");
        text.property.fillText = "I'm Liao Wangcheng.";
        text.property.fontSize = 25 / 2;
        text.property.fontColor = "#f00";
        text.property.frameWidth = 100;
        //text.property.fontFamily = "MFYueYuan_Noncommercial-Regular"
        text.update();
        comNode.property.width = text.property.width;
        comNode.property.height = text.property.height;
        comNode.update();
        console.log(text.property.width)

        engine.manager.registerSystems.children.addChild(rootStage, entity);
        var event = entity.addComponent("event");
        sysEvent.listen(entity, "rootStageResize", function (aEvent) {
            console.log("rootStageResize")
            var scaleX = rootStage.components.node.property.width * 0.8 / text.property.width;
            var scaleY = rootStage.components.node.property.height * 0.15 / text.property.height;
            var scale = Math.min(scaleX, scaleY);
            //text.property.fontSize = 25 * scale;
            //text.update();
            comNode.property.scaleX = scale;
            comNode.property.scaleY = scale;
            //text.update();
            comNode.property.x = aEvent.width / 2;
            comNode.property.y = aEvent.height / 4;
            comNode.property.width = text.property.width;
            comNode.property.height = text.property.height;
            comNode.update();
        });

=======
        //entity.addComponent("children");
        var comImage = entity.addComponent("image");
        comImage.property.file = "assets/bgTile.png";
        comImage.update();
        //engine.manager.registerSystems.children.addChild(mainScene,entity);
        engine.manager.registerSystems.children.addChild(ent1, entity);
        return entity;
    }();
    var ent3 = function () {
        var entity = engine.manager.newEntity();
        var comNode = entity.addComponent("node");
        comNode.property.x = 256;
        comNode.property.y = 0;
        comNode.property.width = 256;
        comNode.property.height = 256;
        comNode.property.anchorPointX = 0.5;
        comNode.property.anchorPointY = 0.5;
        comNode.property.rotation = 90;
        comNode.update();
        //entity.addComponent("children");
        var comImage = entity.addComponent("image");
        comImage.property.file = "assets/bgTile.png";
        comImage.update();
        //engine.manager.registerSystems.children.addChild(mainScene,entity);
        engine.manager.registerSystems.children.addChild(ent1, entity);
        return entity;
    }();
    var ent4 = function () {
        var entity = engine.manager.newEntity();
        var comNode = entity.addComponent("node");
        comNode.property.x = 0;
        comNode.property.y = 256;
        comNode.property.width = 256;
        comNode.property.height = 256;
        comNode.property.anchorPointX = 0.5;
        comNode.property.anchorPointY = 0.5;
        comNode.property.rotation = 90;
        comNode.update();
        //entity.addComponent("children");
        var comImage = entity.addComponent("image");
        comImage.property.file = "assets/bgTile.png";
        comImage.update();
        //engine.manager.registerSystems.children.addChild(mainScene,entity);
        engine.manager.registerSystems.children.addChild(ent1, entity);
>>>>>>> parent of c361068... 0408
        return entity;
    }();

}