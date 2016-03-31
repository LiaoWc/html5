/**
 * Created by liao on 16/2/7.
 */
window.addEventListener('load', function () {
    console.log('window.load');
    window.engine = window.engine || {};
    var manager = engine.manager;

    for (var i in engine.registerComponent) {
        manager.registerComponent(engine.registerComponent[i]);
    }

    engine.registerSystem.sort(function (a, b) {
        if (a.priority > b.priority) {
            return 1;
        }else if(a.priority == b.priority){
            return 0
        }else{
            return -1;
        }

    });
    for (var i in engine.registerSystem) {
        manager.registerSystem(engine.registerSystem[i]);
    }
    engine.run();
    engine.game();


});
