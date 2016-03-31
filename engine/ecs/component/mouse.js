window.engine = window.engine || {};
(function () {
    engine.registerComponent = engine.registerComponent || [];
    this.registerComponent.push({
        name: "mouse",
        needs: ["node"],
        property: [
            {key: 'callback', value: null},
            {key: 'width', value: 0},
            {key: 'height', value: 0},
        ]
    });
    engine.registerSystem = engine.registerSystem || [];
    this.registerSystem.push({
        name: "mouse",
        priority: -1,
        systemComponent: ["mouse"],
        onInit: function () {
            var tCanvas = engine.getCanvas();
            var isDown = false;
            this.mouseEvent = [];
            var system = this;
            var dpr = engine.getDPR();
            tCanvas.addEventListener('mousedown', function (event) {
                dpr = engine.getDPR();
                if (event.button == 2) {
                    system.mouseEvent.push({
                        state: "rightDown",
                        x: event.clientX * dpr,
                        y: event.clientY * dpr
                    });
                } else if (event.button == 0) {
                    system.mouseEvent.push({
                        state: "leftDown",
                        x: event.clientX * dpr,
                        y: event.clientY * dpr
                    });
                    isDown = true;
                }
            }, false);

            tCanvas.addEventListener('mousemove', function (event) {
                if (isDown) {
                    system.mouseEvent.push({
                        state: "mouseMove",
                        x: event.clientX * dpr,
                        y: event.clientY * dpr
                    });
                }
            }, false);
            tCanvas.addEventListener('mouseup', function (event) {
                //console.log("up")
                if (event.button == 2) {
                    system.mouseEvent.push({
                        state: "rightUp",
                        x: event.clientX * dpr,
                        y: event.clientY * dpr
                    });

                } else if (event.button == 0) {
                    system.mouseEvent.push({
                        state: "leftUp",
                        x: event.clientX * dpr,
                        y: event.clientY * dpr
                    });
                    isDown = false;
                }
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
            if (this.mouseEvent.length > 0) {
                var tComponents = this.components;
                var root = engine.manager.getSystem({name: "zOrder"}).root;
                for (var j = 0; j < this.mouseEvent.length; j++) {
                    var tEvent = this.mouseEvent[j];
                    for (var i = 0; i < root.length; i++) {
                        var tEntity = root[i];
                        var tComponent = tComponents[tEntity.id];
                        if (tComponent) {
                            var tRenderProperty = tComponent.entity.getComponent("render").property;
                            var tListener = tComponent.property.callback;
                            var x = tEvent.x - tRenderProperty.x;
                            var y = tEvent.y - tRenderProperty.y;
                            var localX = x / tRenderProperty.scaleX;
                            var localY = y / tRenderProperty.scaleY;

                            if (tEvent.state == "leftDown") {
                                //检查触摸点是否已达上限
                                //console.log(tEvent, localX,localY,tComponent.property)
                                if (localX < tComponent.property.width && localX > 0
                                    && localY < tComponent.property.height && localY > 0) {
                                    //console.log(tEvent, localX,localY,tComponent.property)
                                    var re = tListener({
                                        state: "leftDown",
                                        x: tEvent.x / tRenderProperty.scaleX,
                                        y: tEvent.y / tRenderProperty.scaleY
                                    });
                                    if (re) {
                                        //发生吞噬
                                        this.swallowEntity = tEntity.id;
                                        break;
                                    }
                                }
                            } else if (tEvent.state == "rightDown") {
                                //检查触摸点是否已达上限
                                if (localX < tComponent.property.width && localX > 0
                                    && localY < tComponent.property.height && localY > 0) {
                                    var re = tListener({
                                        state: "rightDown",
                                        x: tEvent.x / tRenderProperty.scaleX,
                                        y: tEvent.y / tRenderProperty.scaleY
                                    });
                                    if (re) {
                                        //发生吞噬
                                        break;
                                    }
                                }
                            } else if (tEvent.state == "mouseMove") {
                                if (this.swallowEntity == tEntity.id) {
                                    tListener({
                                        state: "mouseMove",
                                        x: tEvent.x / tRenderProperty.scaleX,
                                        y: tEvent.y / tRenderProperty.scaleY
                                    });
                                }
                            } else if (tEvent.state == "leftUp") {
                                if (this.swallowEntity == tEntity.id) {
                                    tListener({
                                        state: "leftUp",
                                        x: tEvent.x / tRenderProperty.scaleX,
                                        y: tEvent.y / tRenderProperty.scaleY
                                    });
                                    this.swallowEntity = null;
                                }
                            } else if (tEvent.state == "rightUp") {

                                if (this.swallowEntity == tEntity.id) {
                                    tListener({
                                        state: "rightUp",
                                        x: tEvent.x / tRenderProperty.scaleX,
                                        y: tEvent.y / tRenderProperty.scaleY
                                    });

                                }
                            }
                        }
                    }
                }
                this.mouseEvent = [];
            }
        }
    });
}).call(engine);