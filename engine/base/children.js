window.engine = window.engine || {};
(function() {
    engine.registerComponent = engine.registerComponent || [];
    this.registerComponent.push({
        name: "children",
        needs: ["node"],
        property: [
            { key: 'entities', value: null },
        ]
    });
    engine.registerSystem = engine.registerSystem || [];
    var checkLoop = function(aComponent) {
        //console.log(aComponent)
        var entities = aComponent.property.entities;

        for (var i in entities) {
            var entity = entities[i];
            entity.components.node.update();
            if(entity.components.children){
                checkLoop(entity.components.children);
            }

        }
    }
    this.registerSystem.push({
        name: "children",
        priority: 1,
        systemComponent: ["children"],
        onInit: function() {
            //拥有node的实体
            this.addChild = function(aParentEntity, aChildEntity) {
                if (aChildEntity.components.parent == null) {
                    aChildEntity.addComponent("parent");
                }
                if (aChildEntity.components.parent.property.entity != aParentEntity) {
                    if (aChildEntity.components.parent.property.entity != null) {
                        //从上一个父节点中移除
                        var lastParentEntity = aChildEntity.components.parent.property.entity;
                        this.removeChild(lastParentEntity, aChildEntity)
                    }
                    //加入新父节点中
                    var entities = aParentEntity.components.children.property.entities;
                    var add = false;
                    for (var i = 0, len = entities.length; i < len; ++i) {
                        var entity = entities[i];
                        var eHP = entity.components.hierarchy.property;
                        var cHP = aChildEntity.components.hierarchy.property;
                        if (cHP.level < eHP.level) {
                            add = true;
                            entities.splice(i,0,aChildEntity);
                        }else {
                            if (eHP.timestamp < eHP.level) {
                                add = true;
                                entities.splice(i, 0, aChildEntity);
                            }
                        }
                    }
                    if(add == false){
                        entities.push(aChildEntity)
                    }
                    aChildEntity.components.parent.property.entity = aParentEntity;
                    aChildEntity.components.parent.update();
                }
            }
            this.removeChild = function(aParentEntity, aChildEntity) {
                delete aParentEntity.property.children[aChildEntity.id];
            }
        },
        onAdd: function(aComponent) {
            //组件加入时触发
            aComponent.property.entities = [];
        },
        //onRemove: function (aComponent) {
        //    //组件移除时触发
        //},
        // onUpdate: function(aComponent) {

        // },
        onLoop: function(aDelta) {
            //获取发生改变node节点
            var sysRender = engine.manager.registerSystems.render;
            if(sysRender.beUpdated){
                for (var i in sysRender.updatedComponents) {
                    //发生改变的node节点的实体中是否包含children组件
                    if(sysRender.updatedComponents[i].entity.components.children){
                        sysRender.updatedComponents[i].entity.components.children.update();
                    }
                }
            }
            if (this.beUpdated) {
                for (var i in this.updatedComponents) {
                    //发生改变的node节点的实体中是否包含children组件
                    //console.log(this.updatedComponents[i])
                    checkLoop(this.updatedComponents[i]);
                }
            }
        }
    });
}).call(engine);