window.engine = window.engine || {};
(function () {
    engine.registerComponent = engine.registerComponent || [];
    this.registerComponent.push({
        name: "node",
        needs: ["render", "hierarchy"],
        unique: true,
        property: [
            {key: 'x', value: 0},
            {key: 'y', value: 0},
            {key: 'scaleX', value: 1},
            {key: 'scaleY', value: 1},
            {key: 'rotation', value: 0},
        ]
    });



    engine.registerSystem = engine.registerSystem || [];
    this.registerSystem.push({
        name: "node",
        priority: 0,
        systemComponent: ["node"],
        //onInit: function () {
        //    //拥有node的实体
        //},
        onAdd: function (args) {
            //组件加入时触发
            //var tEntity = args.component.entity;
            //var tRender = tEntity.getComponent("render");
            //var tNode = tEntity.getComponent({name: "node"});
            //tRender.property.x = tNode.property.x;
            //tRender.property.y = tNode.property.y;
            //tRender.property.scaleX = tNode.property.scaleX;
            //tRender.property.scaleY = tNode.property.scaleY;
            //tRender.property.rotation = tNode.property.rotation;
            //tRender.update();
        },
        //onRemove: function (args) {
        //    //组件移除时触发
        //},
        onUpdate: function (args) {
            //组件改变时触发

            //var tEntity = args.component.entity;
            //if (tEntity) {
            //    var tRender = tEntity.components.render;
            //    var tNode = tEntity.components.node;
            //    tRender.property.x = tNode.property.x;
            //    tRender.property.y = tNode.property.y;
            //    tRender.property.scaleX = tNode.property.scaleX;
            //    tRender.property.scaleY = tNode.property.scaleY;
            //    tRender.property.rotation = tNode.property.rotation;
            //    tRender.update();
            //}

        },
        onLoop: function (aDelta) {
            //系统更新时触发
            for (var i in this.updatedComponents) {
                //console.log(i);
                //node发生改变
                var tEntity = engine.manager.getEntityById(i);
                var tRender = tEntity.components.render;
                var tNode = tEntity.components.node;
                tRender.property.x = tNode.property.x;
                tRender.property.y = tNode.property.y;
                tRender.property.scaleX = tNode.property.scaleX;
                tRender.property.scaleY = tNode.property.scaleY;
                tRender.property.rotation = tNode.property.rotation;
                tRender.update();
            }
        }
    });
}).call(engine);