window.app = window.app || {};
app.resumeLayer = function () {
    console.log("app.resumeLayer")
    var rootScene = engine.manager.entitiesWithTag["rootScene"];
    var sysEvent = engine.manager.registerSystems.event;
}