window.engine = window.engine || {};
(function () {
    engine.registerComponent = engine.registerComponent || [];
    this.registerComponent.push({
        name: "size",
        needs: ["node"],
        property: [
            {key: 'width', value: 0},
            {key: 'height', value: 0}
        ]
    });
    engine.registerSystem = engine.registerSystem || [];
    this.registerSystem.push({
        name: "size",
        priority: 5,
        systemComponent: ["size"],
        onUpdate: function (args) {

        },
        onLoop: function (aDelta) {

        }
        //onAdd: function (args) {
        //},
        //onRemove: function (args) {
        //    //组件移除时触发
        //},
        //onUpdate: function (args) {
        //    //组件改变时触发
        //},
        //onLoop: function (aDelta) {
        //}
    });
}).call(engine);