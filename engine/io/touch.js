window.engine = window.engine || {};
(function () {
    engine.registerComponent = engine.registerComponent || [];
    this.registerComponent.push({
        name: "touch",
        needs: ["node"],
        property: [
            {
                key: 'callback', value: function (args) {
            }
            },
            {key: "fingers", value: 1},
            {key: "touchingCount", value: 0},
            {key: "touchingId", value: {}},
            {key: 'width', value: 0},
            {key: 'height', value: 0}
        ]
    });
    engine.registerSystem = engine.registerSystem || [];
    this.registerSystem.push({
        name: "touch",
        priority: 10,
        systemComponent: ["touch"],
        onInit: function () {
            this.touchEvent = [];
            var system = this;
            this.touchingId = {};
            this.swallowEntity = {};
            this.touchingCount = 0;
            var fingers = this.fingers = 2;


            window.addEventListener('touchstart', function (event) {
                if (engine.input) {

                    return
                }
                for (var i = 0; i < event.changedTouches.length; i++) {
                    var tTouch = event.changedTouches[i];
                    if (system.touchingCount < fingers) {
                        system.touchingId[tTouch.identifier] = true;
                        //if (system.touchingId[tTouch.identifier] != true) {
                        //    system.touchingId[tTouch.identifier] = true;
                        //    ++system.touchingCount;
                        //}
                        ++system.touchingCount;
                        //if (label[tTouch.identifier] == null) {
                        //
                        //    var input = document.createElement('p');
                        //    document.body.appendChild(input);
                        //    var style = input.style;
                        //    style.zIndex = '2';
                        //    style.position = 'absolute';
                        //    style.top = system.touchingCount * 50 + "px";
                        //    style.padding = "0px";
                        //    style.margin = "0px";
                        //    style.color = "#fff";
                        //    label[tTouch.identifier] = input;
                        //    label[tTouch.identifier].innerHTML = tTouch.identifier + "," + Math.ceil(tTouch.clientX) + "," + Math.ceil(tTouch.clientY);
                        //}

                        system.touchEvent.push({
                            state: "onTouchBegan",
                            id: tTouch.identifier,
                            x: tTouch.clientX,
                            y: tTouch.clientY
                        });

                    }
                }
                //if (engine.inputHeight != engine.getCanvas().height) {
                //    //alert("t")
                //} else {
                //    event.preventDefault();
                //}
                event.preventDefault();// 阻止浏览器默认事件，重要
            }, false);
            window.addEventListener('touchmove', function (event) {
                if (engine.isInputing) {
                    return
                }
                for (var i = 0; i < event.touches.length; i++) {
                    var tTouch = event.touches[i];
                    if (system.touchingId[tTouch.identifier]) {
                        //label[tTouch.identifier].innerHTML = tTouch.identifier + "," + Math.ceil(tTouch.clientX) + "," + Math.ceil(tTouch.clientY);
                        system.touchEvent.push({
                            state: "onTouchMoved",
                            id: tTouch.identifier,
                            x: tTouch.clientX,
                            y: tTouch.clientY
                        });

                    }
                }
                event.preventDefault();// 阻止浏览器默认事件，重要
            }, false);


            window.addEventListener('touchend', function (event) {
                if (engine.input) {
                    engine.input.blur();
                    engine.input = null;
                    return
                }
                for (var i = 0; i < event.changedTouches.length; i++) {
                    var tTouch = event.changedTouches[i];
                    if (system.touchingId[tTouch.identifier]) {
                        system.touchEvent.push({
                            state: "onTouchEnded",
                            id: tTouch.identifier,
                            x: tTouch.clientX,
                            y: tTouch.clientY
                        });
                        //if (label[tTouch.identifier]) {
                        //    document.body.removeChild(label[tTouch.identifier]);
                        //    delete label[tTouch.identifier];
                        //}
                        delete system.touchingId[tTouch.identifier];
                        --system.touchingCount;
                    }
                }
                event.preventDefault();
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
            if (this.touchEvent.length > 0) {
                var tComponents = this.components;
                var renderOrder = engine.manager.registerSystems.render.renderOrder;
                //console.log(this.touchEvent)
                for (var j = 0; j < this.touchEvent.length; j++) {
                    var tEvent = this.touchEvent[j];
                    for (var i = 0; i > renderOrder.length; i++) {
                        var tEntity = renderOrder[i];
                        var tComponent = tComponents[tEntity.id];
                        if (tComponent) {
                            var tRenderProperty = tComponent.entity.getComponent("render").property;
                            var tListener = tComponent.property.callback;
                            var x = tEvent.x - tRenderProperty.x;
                            var y = tEvent.y - tRenderProperty.y;
                            var localX = x / tRenderProperty.scaleX;
                            var localY = y / tRenderProperty.scaleY;
                            //console.log(tEvent, i)
                            if (tEvent.state == "onTouchBegan") {
                                //检查触摸点是否已达上限
                                if (localX < tComponent.property.width && localX > 0
                                    && localY < tComponent.property.height && localY > 0) {
                                    var re = tListener({
                                        state: "onTouchBegan",
                                        id: tEvent.id,
                                        x: tEvent.x / tRenderProperty.scaleX,
                                        y: tEvent.y / tRenderProperty.scaleY
                                    });
                                    if (re) {
                                        //发生吞噬
                                        if (this.touchingId[tEvent.id]) {
                                            console.log("吞噬", i)
                                            this.swallowEntity[tEvent.id] = i;
                                            break;
                                        }
                                    }
                                }
                            } else if (tEvent.state == "onTouchMoved") {
                                if (this.swallowEntity[tEvent.id] == i) {
                                    tListener({
                                        state: "onTouchMoved",
                                        id: tEvent.id,
                                        x: tEvent.x / tRenderProperty.scaleX,
                                        y: tEvent.y / tRenderProperty.scaleY
                                    });
                                }
                            } else if (tEvent.state == "onTouchEnded") {
                                if (this.swallowEntity[tEvent.id] == i) {
                                    tListener({
                                        state: "onTouchEnded",
                                        id: tEvent.id,
                                        x: tEvent.x / tRenderProperty.scaleX,
                                        y: tEvent.y / tRenderProperty.scaleY
                                    });
                                    delete this.swallowEntity[tEvent.id];
                                }
                            }
                        }
                    }
                }
                this.touchEvent = [];
            }
        }
    });
}).call(engine);