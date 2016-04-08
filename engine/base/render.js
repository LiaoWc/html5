window.engine = window.engine || {};
(function () {
    engine.registerComponent = engine.registerComponent || [];
    this.registerComponent.push({
        name: "render",
        property: [
            {key: 'x', value: 0},
            {key: 'y', value: 0},
            {key: 'scaleX', value: 1},
            {key: 'scaleY', value: 1},
            {key: 'rotation', value: 0},
            {key: 'alpha', value: 1},

            {key: 'level', value: 0},
            {key: "timestamp", value: 0},

            {key: 'canvas', value: null},
            {key: 'drawCall', value: null},
            //最近一次的绘制属性
            // { key: 'lastX', value: 0 },
            // { key: 'lastY', value: 0 },
            // { key: 'lastWidth', value: 0 },
            // { key: 'lastHeight', value: 0 },

        ]
    });
    engine.registerSystem = engine.registerSystem || [];
    this.registerSystem.push({
        name: "render",
        priority: 6,
        systemComponent: ["render"],
        onInit: function () {
            this.rootEntity = null;
            this.renderOrder = [];

            this.renderEntity = function (aEntity, aCanvas) {
                //console.log(aEntity.id)
                //跳过未发生变化的实体
                //if(this.updatedComponents[aEntity.id] == null){
                //    return
                //}

                //var canvas = aEntity.components.render.property.canvas;
                var context = aCanvas.getContext("2d");


                if (aEntity.components.render.property.canvas) {
                    context.clearRect(0, 0, aCanvas.width, aCanvas.height);
                }

                this.renderOrder.unshift(aEntity);
                //排序
                // console.log(engine.manager.registerSystems.hierarchy)
                // var root = engine.manager.getSystem("hierarchy").root;


                var comChildren = aEntity.components.children;
                if (comChildren) {

                    for (var i in comChildren.property.entities) {

                        var entity = comChildren.property.entities[i];
                        //console.log(entity.components.render.property)
                        if (entity.components.render.property.canvas) {
                            if (entity.components.render.property.drawCall) {
                                entity.components.render.property.drawCall(entity.components.render.property.canvas);
                            }
                            this.renderEntity(entity, entity.components.render.property.canvas);
                        } else {
                            if (entity.components.render.property.drawCall) {
                                entity.components.render.property.drawCall(aCanvas);
                            }
                            this.renderEntity(entity, aCanvas);
                        }
                    }
                }
            };
            var self = this;
            window.addEventListener("resize", function () {
                self.beUpdated = true;
            })
        },
        //onAdd: function (args) {
        //
        //},
        //onUpdate: function (args) {
        //
        //},
        onLoop: function (aDelta) {
            //系统更新时触发
            if (this.beUpdated && this.rootEntity != null) {
                this.renderOrder = [];
                this.renderEntity(this.rootEntity, this.rootEntity.components.render.property.canvas);
            }
        }
    });
}).call(engine);