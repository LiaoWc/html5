window.engine = window.engine || {};
(function () {
    engine.registerComponent = engine.registerComponent || [];
    this.registerComponent.push({
        name: "parent",
        needs: ["node"],
        property: [
            {key: 'entity', value: null},
        ]
    });
    engine.registerSystem = engine.registerSystem || [];
    this.registerSystem.push({
        name: "parent",
        priority: 3,
        systemComponent: ["parent"],
        //onInit: function () {
        //    //拥有node的实体
        //},
        onAdd: function (args) {
            //组件加入时触发
            //检测parent是否有children组件
            //var childEntity = args.component.entity;
            //var parentEntity = args.component.property.entity;
            //if (parentEntity) {
            //    if (parentEntity.components.children == null) {
            //        var tChildren = engine.manager.newComponent({name: "children"});
            //        parentEntity.addComponent(tChildren);
            //        tChildren.property.entities[childEntity.id] = true;
            //    } else {
            //        var tChildren = parentEntity.getComponent({name: "children"});
            //        tChildren.property.entities[childEntity.id] = true;
            //    }
            //}
            //console.log(args.component.entity,parentEntity)

        },
        //onRemove: function (args) {
        //    //组件移除时触发
        //},
        onUpdate: function (args) {
            //组件改变时触发
            // var childEntity = args.component.entity;
            // var parentEntity = args.component.property.entity;
            // //console.log(childEntity.flag, parentEntity.flag);
            // if (parentEntity) {
            //     //console.log(parentEntity.getComponent({name: "children"}))
            //     if (parentEntity.getComponent({name: "children"}) == null) {
            //         //var tChildren = engine.manager.newComponent({name: "children"});
            //         var tChildren = parentEntity.addComponent("children");
            //         tChildren.property.entities[childEntity.id] = true;
            //         tChildren.update();
            //         //console.log(tChildren.property.entities)
            //     } else {
            //         var tChildren = parentEntity.getComponent({name: "children"});
            //         tChildren.property.entities[childEntity.id] = true;
            //     }
            // }

        },
        onLoop: function (aDelta) {
            //系统更新时触发
            //从改变的node中，检查是否有存在relation关系的节点
            for (var i in this.updatedComponents) {
                //console.log(i);
                var comParent = this.updatedComponents[i];
                var entityParentRender = comParent.property.entity.components.render;
                var entityRender = comParent.entity.components.render;
                //var entityNode = comParent.entity.components.node;
                var r = -Math.PI / 180 * entityParentRender.property.rotation;
                var x = entityRender.property.x * entityParentRender.property.scaleX;
                var y = entityRender.property.y * entityParentRender.property.scaleY;
                var newX = x * Math.cos(r) + y * Math.sin(r);
                var newY = y * Math.cos(r) - x * Math.sin(r);
                //console.log(x,y,newX,newY)
                entityRender.property.x = newX + entityParentRender.property.x;
                entityRender.property.y = newY + entityParentRender.property.y;
                entityRender.property.scaleX *= entityParentRender.property.scaleX;
                entityRender.property.scaleY *= entityParentRender.property.scaleY;
                entityRender.property.rotation += entityParentRender.property.rotation;
                entityRender.property.alpha *= entityParentRender.property.alpha;
                entityRender.property.canvas = entityParentRender.property.canvas;
                entityRender.update();
            }
        }
    });
}).call(engine);