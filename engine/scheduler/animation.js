window.engine = window.engine || {};
(function () {
    engine.registerComponent = engine.registerComponent || [];
    this.registerComponent.push({
        name: "timer",
        property: [
            {key: 'interval', value: 0},
            {key: 'delay', value: 0},
            {key: 'callback', value: null},
            {key: 'pause', value: false},
            {key: 'finish', value: false},
            {key: 'curTime', value: 0},
        ]
    });
    engine.registerSystem = engine.registerSystem || [];
    this.registerSystem.push({
        name: "timer",
        priority: 10,
        systemComponent: ["timer"],
        onInit: function () {
            //拥有node的实体
            this.allTimer = {};
        },
        onAdd: function (aComponent) {
            this.allTimer[aComponent.entity.id] = aComponent;
        },
        //onRemove: function (args) {
        //    //组件移除时触发
        //},
        onUpdate: function (args) {

        },
        onLoop: function (aDelta) {
            for (var i in this.allTimer) {
                var timer = this.allTimer[i];
                timer.property.curTime += aDelta;
                if (timer.property.curTime > timer.property.interval) {
                    timer.property.callback(timer.property.curTime);
                    timer.property.curTime = 0;
                }
            }
        }
    });
}).call(engine);