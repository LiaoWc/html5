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

            {key: 'canvas', value: true},
            {key: 'drawCall', value: false},
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

            this.renderEntity = function (aEntity) {
                var canvas = aEntity.components.render.property.canvas;
                var context = canvas.getContext("2d");

                if (aEntity.components.parent == null) {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                }


                //排序
                // console.log(engine.manager.registerSystems.hierarchy)
                // var root = engine.manager.getSystem("hierarchy").root;
                console.log("render")

                var comChildren = aEntity.components.children;
                if (comChildren) {

                    for (var i in comChildren.property.entities) {

                        var entity = comChildren.property.entities[i];
                        //console.log(entity.components.render.property)
                        if (entity.components.render.property.drawCall) {
                            entity.components.render.property.drawCall(canvas);

                        }
                        this.renderEntity(entity);
                    }
                }
            };
            var self = this;
            window.addEventListener("resize", function () {
                self.beUpdated = true;
            })
        },
        onAdd: function (args) {

        },
        onUpdate: function (args) {
            //console.log("render",args.component.entity.id);
        },
        onLoop: function (aDelta) {
            //系统更新时触发
            if (this.beUpdated && this.rootEntity != null) {
                //var tComponents = this.components;

                this.renderEntity(this.rootEntity);
                //console.log(this.components)

                // //console.log("render", root)
                // for (var i = root.length - 1; i >= 0; i--) {
                //     var tEntity = root[i];
                //     //console.log(tEntity.components.zOrder.property)
                //     var tRender = tEntity.getComponent("render");
                //     var tProperty = tRender.property;
                //     if (tProperty.draw) {
                //         //console.log("render", i, tProperty.draw)
                //         tContext.save();
                //         tContext.scale(tProperty.scaleX, tProperty.scaleY);
                //         tContext.translate(tProperty.x / tProperty.scaleX, tProperty.y / tProperty.scaleX);
                //         //tContext.rotate(Math.PI/180*45);
                //         tContext.drawImage(tProperty.draw, 0, 0);
                //         tContext.restore();
                //     }
                // }

            }
        }
    });
}).call(engine);