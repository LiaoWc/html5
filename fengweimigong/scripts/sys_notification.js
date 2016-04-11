//消息通知模块
var sys_notification = {}
game_sys_notification = sys_notification;
// 监听记录
sys_notification.array_listener = [];
// 事件记录
//sys_notification.array_event = [];

//注册消息监听
sys_notification.dispatch = function (name, data) {
    var event = new cc.EventCustom(name);
    event.setUserData(data);
    // this.array_event.push(event)
    cc.eventManager.dispatchEvent(event);
}

//发放消息
sys_notification.listen = function (name, cb) {
    var listener = cc.EventListener.create({
        event: cc.EventListener.CUSTOM,
        eventName: name,
        callback: cb
    });
    cc.eventManager.addListener(listener, 1);
    sys_notification.array_listener.push(listener)
    return listener
}

//保存消息
sys_notification.remove = function (listener){
    cc.eventManager.removeListener(listener)
}

//提取消息

sys_notification.init = function () {
    for (var i in sys_notification.array_listener) {
        cc.eventManager.removeListener(sys_notification.array_listener[i])
    }
}










