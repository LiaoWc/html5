window.app = window.app || {};
app.resumeLayer = function () {
    console.log("app.resumeLayer")
    var rootScene = engine.manager.entitiesWithTag["rootScene"];
    var sysEvent = engine.manager.registerSystems.event;


    app.bgLayer();
    ////

    app.home();
    app.about();
    app.resume();
    app.skill();
    app.works();
    app.navigationBar();

    sysEvent.dispatch(rootScene, "rootSceneResize", {
        width: rootScene.components.node.property.width,
        height: rootScene.components.node.property.height
    })
}