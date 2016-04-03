window.app = window.app || {};
app.shapeDemo = function () {
    console.log("app.shapeDemo")
    var mainScene = engine.manager.entitiesWithTag["mainScene"];
    var rect1 = function () {
        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");
        //node.property.x = 0;
        //node.property.y = 0;
        //console.log(mainScene.components.node.property.width)
        node.property.width = mainScene.components.node.property.width;
        node.property.height = 100;
        node.property.alpha = 0.8;
        //node.property.anchorPointX = 0.5;
        //node.property.anchorPointY = 0.5;
        //node.property.rotation = 0;
        node.update();
        entity.addComponent("children");
       var hierarchy =  entity.components.hierarchy;
        //hierarchy.property.level = 0;
        hierarchy.update();
        var rect = entity.addComponent("rect");
        rect.property.width = mainScene.components.node.property.width;
        rect.property.height = 40;
        rect.property.fillColor = "#000";
        rect.update();

        engine.manager.registerSystems.children.addChild(mainScene, entity);


        return entity;
    }();

    var rect2 = function () {
        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");
        node.property.x = 150;
        node.property.y = 150;
        node.property.width = 100;
        node.property.height = 100;
        node.property.anchorPointX = 0.5;
        node.property.anchorPointY = 0.5;
        node.property.rotation = 0;
        node.update();
        entity.addComponent("children");

        var rect = entity.addComponent("rect");
        rect.property.width = 100;
        rect.property.height = 100;
        rect.property.fillColor = "#ff0";
        rect.update();

        engine.manager.registerSystems.children.addChild(mainScene, entity);
        return entity;
    }();
}