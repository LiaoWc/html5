window.engine = window.engine || {};
(function () {
    var notification = new (function () {
        //所有的监听
        var _allListener = {};
        //所有的事件对应监听
        var _allEventListener = {};
        var _count = 0;
        //分发事件
        this.dispatchEvent = function (args) {
            //事件名
            var tEventName = args.eventName;
            //事件对应的监听列表
            var tAllEventCallback = _allListener[tEventType];
            for (var i in tAllEventCallback) {
                var tCallback = tAllEventCallback[i];
                tCallback(args);
            }
        };
        //添加事件监听
        this.addEventListener = function (args) {
            //事件名
            var tEventName = args.eventName;
            //事件的回调函数
            var tCallback = args.callback;

            var tListener = {
                id: ++_count,
                eventName: tEventName,
                callback: tCallback
            }
            _allListener[tEventName] = _allListener[tEventName] || [];
            _allListener[tEventName].push(tCallback);
        };
        //移除事件监听
        this.removeEventListener = function (args) {

        };
    })();
    this.getNotification = function () {
        return notification;
    };

}).
    call(engine);