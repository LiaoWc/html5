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
        var comImage = entity.addComponent("image");
        comImage.property.file = "assets/bgTile.png";
        comImage.update();

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
        return entity;
    }();

}