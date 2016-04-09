window.app = window.app || {};
app.mainScene = function () {
    console.log("app.mainScene")
    var manager = engine.manager;

    var entity = manager.newEntity();
    entity.setTag("mainScene");
    var comNode = entity.addComponent("node");

    entity.addComponent("children");
    var canvas = engine.newCanvas();
    var comRender = entity.components.render;
    comRender.property.canvas = canvas;
    var systemRender = manager.registerSystems.render;
    systemRender.rootEntity = entity;


    comNode.property.width = 320;
    var scale = window.innerWidth / comNode.property.width / engine.dpr;
    comNode.property.height = window.innerHeight / window.innerWidth * comNode.property.width;
    comNode.property.scaleX = engine.dpr * scale;
    comNode.property.scaleY = engine.dpr * scale;
    comNode.update();

    //app.main();
    app.shapeDemo();
}