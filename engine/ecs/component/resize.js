window.engine = window.engine || {};
(function () {
    engine.registerComponent = engine.registerComponent || [];
    this.registerComponent.push({
        name: "resize",
        property: [
            {key: 'callback', value: null}
        ]
    });
    engine.registerSystem = engine.registerSystem || [];
    this.registerSystem.push({
        name: "resize",
        priority: -1,
        systemComponent: ["resize"],
        onInit: function () {
            var system = this;
            window.addEventListener('resize', function () {
                system.beResized = true;
            }, false);
        },
        //onAdd: function (args) {
        //    //组件加入时触发
        //},
        //onRemove: function (args) {
        //    //组件移除时触发
        //},
        //onUpdate: function (args) {
        //    //组件改变时触发
        //},
        onLoop: function (aDelta) {
            if (this.beResized) {
                for (var i in this.components) {
                    var tComponent = this.components[i];
                    var tCallback = tComponent.property.callback;
                    if(tCallback){
                        tCallback.call(tComponent);
                    }
                }
                this.beResized = false;
            }
        }
    });
}).call(engine);