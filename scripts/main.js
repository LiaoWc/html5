window.engine = window.engine || {};
engine.game = function () {
    var loadPNG = [
        //"head.png",
        //"http://hsxn.oss-cn-shanghai.aliyuncs.com/fhjr/share.jpg",
        //"jwyg1.png",
    ];
    //var queue = engine.getPreload().getLoadQueue();
    //queue.setMaxConnections(5);
    //for (var i = 0; i < loadPNG.length; i++) {
    //    queue.loadManifest([
    //        {id: loadPNG[i], src: '' + loadPNG[i]}
    //    ]);
    //}
    //queue.on("complete", handleComplete, this);

    custom.editor();
    //custom.editor_menu();
    //custom.editor_project();
    //custom.editor_component();
    //custom.editor_inspector();
    //custom.editor_stage();


//    var ws = new WebSocket("ws://127.0.0.1:8080");
//    ws.onopen = function (evt) {
//        console.log("open");
//        ws.send("123");
//        //self.send(["Box2d", ["joinWorld", {world: "test"}]]);
//        //self.send(["Box2d",["applyImpulse", {world: "test", body: "ball",impulse:3}]]);
//    };
//    ws.onmessage = function (msg) {
//        //var message = {
//        //    method:"",
//        //    args:{}
//        //}
//        //var data = JSON.parse(msg.data);
//        //var method = data[0];
//        //var args = data[1];
//
//        console.log("message", msg);
//        //game_sys_notification.dispatch("GameSocketOnMessage", msg.data)
//        //messages.push(msg.data)
//        //game_sys_notification.dispatch(method, args);
//    };
////
//    ws.onerror = function (evt) {
//        console.log("Error", evt.data);
//        ws.close();
//        ws = null;
//    };
////
//    ws.onclose = function (evt) {
//        //alert("close")
//        console.log("close");
//        //game_sys_notification.dispatch("GameSocketOnClose")
//        ws = null;
//    };
}