window.engine = window.engine || {};
(function () {
    engine.registerComponent = engine.registerComponent || [];
    this.registerComponent.push({
        name: "children",
        unique: true,
        property: [
            {key: 'entities', value: null},
        ]
    });
    engine.registerSystem = engine.registerSystem || [];
    var checkLoop = function (aId, aSystem) {
        var tChildren = aSystem.components[aId];
        if (tChildren) {
            //获取到children组件的entities
            var tEntities = tChildren.property.entities;
            for (var i in tEntities) {
                var tEntity = engine.manager.entitiesWithId[i];
                var tRender = tEntity.components.render;
                var tNode = tEntity.components.node;
                tRender.property.x = tNode.property.x;
                tRender.property.y = tNode.property.y;
                tRender.property.scaleX = tNode.property.scaleX;
                tRender.property.scaleY = tNode.property.scaleY;
                tRender.property.rotation = tNode.property.rotation;
                tRender.update();
                //console.log(i);
                //父组件更新
                tEntity.components.parent.update();
                checkLoop(i, aSystem);
            }
        }
    }
    this.registerSystem.push({
        name: "children",
        priority: 1,
        systemComponent: ["children"],
        //onInit: function () {
        //    //拥有node的实体
        //},
        onAdd: function (args) {
            //组件加入时触发
            args.component.property.entities = {};
        },
        //onRemove: function (args) {
        //    //组件移除时触发
        //},
        onUpdate: function (args) {

        },
        onLoop: function (aDelta) {
            //获取发生改变node节点
            var nodeUpdatedComponents = engine.manager.systems.node.updatedComponents;
            for (var i in nodeUpdatedComponents) {
                //发生改变的node节点的实体中是否包含children组件
                checkLoop(i, this);
                //var tChildren = this.components[i];
                //console.log("t")
                //if (tChildren) {
                //    //获取到children组件的entities
                //    var tEntities = tChildren.property.entities;
                //    for (var i in tEntities) {
                //        var tEntity = engine.manager.entitiesWithId[i];
                //        var tRender = tEntity.components.render;
                //        var tNode = tEntity.components.node;
                //        tRender.property.x = tNode.property.x;
                //        tRender.property.y = tNode.property.y;
                //        tRender.property.scaleX = tNode.property.scaleX;
                //        tRender.property.scaleY = tNode.property.scaleY;
                //        tRender.property.rotation = tNode.property.rotation;
                //        tRender.update();
                //    }
                //}
            }
            //for (var i in this.updatedComponents) {
            //    console.log(i)
            //    var tEntity = engine.manager.getEntityById(i);
            //    var tRender = tEntity.components.render;
            //    var tNode = tEntity.components.node;
            //    tRender.property.x = tNode.property.x;
            //    tRender.property.y = tNode.property.y;
            //    tRender.property.scaleX = tNode.property.scaleX;
            //    tRender.property.scaleY = tNode.property.scaleY;
            //    tRender.property.rotation = tNode.property.rotation;
            //    tRender.update();
            //}
        }
    });
}).call(engine);