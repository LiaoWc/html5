window.engine = window.engine || {};
(function () {
    engine.registerComponent = engine.registerComponent || [];
    this.registerComponent.push({
        name: "event",
        property: [
            {key: 'listener', value: null},
        ]
    });
    engine.registerSystem = engine.registerSystem || [];
    this.registerSystem.push({
        name: "event",
        priority: 10,
        systemComponent: ["event"],
        onInit: function () {
            //拥有node的实体
            this.allListener = {};
            this.listen = function (aEntity, aEventName, aCallback) {
                this.components[aEntity.id].property.listener[aEventName] = aCallback;
                if (this.allListener[aEventName] == null) {
                    this.allListener[aEventName] = {};
                }
                this.allListener[aEventName][aEntity.id] = aCallback;
            }
            this.dispatch = function (aEntity, aEventName, aParam) {
                var event = {
                    entity: aEntity,
                    name: aEventName
                }
                for (var i in aParam) {
                    event[i] = aParam[i];
                }
                var listeners = this.allListener[aEventName]
                if (listeners) {
                    for (var i in listeners) {
                        listeners[i](event)
                    }
                }
            }
        },
        onAdd: function (aComponent) {
            //组件加入时触发
            aComponent.property.listener = {};
        },
        //onRemove: function (aComponent) {
        //    //组件移除时触发
        //},
        // onUpdate: function(aComponent) {

        // },
        //onLoop: function(aDelta) {
        //    //获取发生改变node节点
        //    var sysRender = engine.manager.registerSystems.render;
        //    if(sysRender.beUpdated){
        //        for (var i in sysRender.updatedComponents) {
        //            //发生改变的node节点的实体中是否包含event组件
        //            if(sysRender.updatedComponents[i].entity.components.event){
        //                sysRender.updatedComponents[i].entity.components.event.update();
        //            }
        //        }
        //    }
        //    if (this.beUpdated) {
        //        for (var i in this.updatedComponents) {
        //            //发生改变的node节点的实体中是否包含event组件
        //            //console.log(this.updatedComponents[i])
        //            checkLoop(this.updatedComponents[i]);
        //        }
        //    }
        //}
    });
}).call(engine);