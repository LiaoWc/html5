window.engine = window.engine || {};
(function () {
    engine.registerComponent = engine.registerComponent || [];
    this.registerComponent.push({
        name: "parent",
        unique: true,
        property: [
            {key: 'entity', value: null},
        ]
    });
    engine.registerSystem = engine.registerSystem || [];

    var checkLoop = function (aEntity, aUpdatedComponents) {
        var tChildren = aEntity.getComponent({name: "children"});
        if (tChildren) {
            var tEntities = tChildren.property.entities;
            for (var i in tEntities) {
                if (aUpdatedComponents[i] != true) {
                    aUpdatedComponents[i] = true;
                    var tEntity = engine.manager.entitiesWithId[i];
                    tEntity.components.node.update();
                    tEntity.components.parent.update();
                    checkLoop(tEntity, aUpdatedComponents);
                }
            }
        }
    };

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
            var childEntity = args.component.entity;
            var parentEntity = args.component.property.entity;
            //console.log(childEntity.flag, parentEntity.flag);
            if (parentEntity) {
                //console.log(parentEntity.getComponent({name: "children"}))
                if (parentEntity.getComponent({name: "children"}) == null) {
                    //var tChildren = engine.manager.newComponent({name: "children"});
                    var tChildren = parentEntity.addComponent("children");
                    tChildren.property.entities[childEntity.id] = true;
                    tChildren.update();
                    //console.log(tChildren.property.entities)
                } else {
                    var tChildren = parentEntity.getComponent({name: "children"});
                    tChildren.property.entities[childEntity.id] = true;
                }
            }

        },
        onLoop: function (aDelta) {
            //系统更新时触发
            //从改变的node中，检查是否有存在relation关系的节点
            var nodeUpdatedComponents = engine.manager.systems.node.updatedComponents;
            for (var i in nodeUpdatedComponents) {
                var tComponent = this.components[i];
                if (tComponent) {
                    this.updatedComponents[i] = true;
                }
            }
            for (var i in this.updatedComponents) {
                //console.log(i);
                var tChild = engine.manager.entitiesWithId[i];
                var tParent = tChild.components.parent.property.entity;
                var tRender = tChild.components.render;
                var tChildProperty = tRender.property;
                var tParentProperty = tParent.components.render.property;
                tChildProperty.x *= tParentProperty.scaleX;
                tChildProperty.y *= tParentProperty.scaleY;
                tChildProperty.x += tParentProperty.x;
                tChildProperty.y += tParentProperty.y;
                tChildProperty.scaleX *= tParentProperty.scaleX;
                tChildProperty.scaleY *= tParentProperty.scaleY;
                tChildProperty.rotation += tParentProperty.rotation;
                tRender.update();
            }
        }
    });
}).call(engine);