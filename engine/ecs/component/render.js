window.engine = window.engine || {};
(function () {
    engine.registerComponent = engine.registerComponent || [];
    this.registerComponent.push({
        name: "render",
        unique: true,
        property: [
            {key: 'x', value: 0},
            {key: 'y', value: 0},
            {key: 'z', value: 0},
            {key: "timestamp", value: 0},
            {key: 'scaleX', value: 1},
            {key: 'scaleY', value: 1},
            {key: 'rotation', value: 0},
            {key: 'opacity', value: 255},
            {key: 'visible', value: true},
            {key: 'draw', value: false},
            //最近一次的绘制属性
            {key: 'lastX', value: 0},
            {key: 'lastY', value: 0},
            {key: 'lastWidth', value: 0},
            {key: 'lastHeight', value: 0},

        ]
    });
    engine.registerSystem = engine.registerSystem || [];
    this.registerSystem.push({
        name: "render",
        priority: 10,
        systemComponent: ["render"],
        onInit: function () {
            //拥有node的实体
            //this.addRenderListener = function (args) {
            //    _allRenderListener.push(args)
            //}
            //window.addEventListener('resize', function () {
            //    beUpdated = true;
            //}, false);
        },
        onAdd: function (args) {

        },
        onUpdate: function (args) {
            //console.log("render",args.component.entity.id);
        },
        onLoop: function (aDelta) {
            //系统更新时触发
            if (this.beUpdated) {
                var tComponents = this.components;
                var tCanvas = engine.getCanvas();
                var tContext = tCanvas.getContext("2d");

                ////遍历改变的组件，得到绘制矩形。
                //var start = new Date().getTime();
                //var drawRects = [];
                //for (var i in this.updatedComponents) {
                //    var tComponent = this.components[i];
                //    var p = tComponent.property;
                //    //确认是否有图形
                //    if (p.draw) {
                //        var rect = {
                //            x: p.x,
                //            y: p.y,
                //            width: p.draw.width,
                //            height: p.draw.height
                //        };
                //        //记录绘制矩形
                //        //drawRects.push(rect);
                //        tContext.clearRect(rect.x, rect.y, rect.width, rect.height);
                //    }
                //    //将上一次绘制的矩形也加入
                //    if (p.lastWidth != 0 && p.lastHeight != 0) {
                //        var rect = {
                //            x: p.lastX ,
                //            y: p.lastY ,
                //            width: p.lastWidth  ,
                //            height: p.lastHeight
                //        };
                //        //记录绘制矩形
                //        drawRects.push(rect);
                //        tContext.clearRect(rect.x, rect.y, rect.width, rect.height);
                //    }
                //}
                ////console.log("clearRect", drawRects)
                //
                ////按照绘图顺序，依次计算重叠区域，并绘制这块区域
                //var root = engine.manager.getSystem({name: "zOrder"}).root;
                //for (var i = 0; i < root.length; i++) {
                //    var tEntity = root[i];
                //    var tRender = tEntity.getComponent("render");
                //    var tProperty = tRender.property;
                //    if (tProperty.draw) {
                //        //遍历绘制矩形
                //        if (this.updatedComponents[tEntity.id]) {
                //            tContext.save();
                //            tContext.translate(tProperty.x, tProperty.y);
                //            tContext.drawImage(tProperty.draw, 0, 0);
                //            tContext.restore();
                //
                //            tProperty.lastX = tProperty.x;
                //            tProperty.lastY = tProperty.y;
                //            tProperty.lastWidth = tProperty.draw.width;
                //            tProperty.lastHeight = tProperty.draw.height;
                //            //console.log(tEntity.id)
                //        } else {
                //            //console.log(tEntity.id)
                //            for (var j = 0; j < drawRects.length; j++) {
                //                var item = drawRects[j];
                //
                //                //计算重叠区域
                //                var startX = Math.max(tProperty.x, item.x);
                //                var startY = Math.max(tProperty.y, item.y);
                //                var endX = Math.min(tProperty.x + tProperty.draw.width, item.x + item.width);
                //                var endY = Math.min(tProperty.y + tProperty.draw.height, item.y + item.height);
                //                //console.log(startX, endX, startY, endY)
                //                if (startX < endX && startY < endY) {
                //                    //绘制重叠矩形
                //                    tContext.save();
                //                    //startX -= 1;
                //                    //startY -= 1;
                //                    var width = endX - startX  ;
                //                    var height = endY - startY  ;
                //                    //console.log(tEntity.id)
                //
                //                    tContext.translate(startX, startY);
                //
                //
                //                    //tContext.drawImage(tProperty.draw, 0, 0);
                //                    tContext.drawImage(tProperty.draw, startX - tProperty.x, startY - tProperty.y, width, height, 0, 0, width, height);
                //                    //tContext.beginPath();
                //                    //tContext.fillRect(startX, startY, endX - startX, endY - startY);
                //                    //tContext.closePath();
                //                    //tContext.clip();
                //                    //tContext.drawImage(tProperty.draw, 0, 0,tProperty.draw.width, tProperty.draw.height , 0, 0, endX - startX, endY - startY);
                //                    tContext.restore();
                //                    //break;
                //                    //如果是改变的组件，则更新他最近一次的绘图信息
                //                    //if (this.updatedComponents[tEntity.id]) {
                //
                //                    //console.log("last",tEntity.id,startY)
                //                    //}
                //
                //                } else {
                //                    //不重叠，跳过
                //                }
                //            }
                //        }
                //
                //
                //    }
                //}

                //for (var i = 0; i < 1000; i++) {
                //    for (var i = 0; i < 1000; i++) {
                //        var c = document.createElement("canvas");
                //    }
                //}

                //console.log("end")

                tContext.clearRect(0, 0, tCanvas.width, tCanvas.height);
                //排序
                console.log(engine.manager.getSystem("hierarchy"))
                var root = engine.manager.getSystem("hierarchy").root;

                //console.log("render", root)
                for (var i = root.length - 1; i >= 0; i--) {
                    var tEntity = root[i];
                    //console.log(tEntity.components.zOrder.property)
                    var tRender = tEntity.getComponent("render");
                    var tProperty = tRender.property;
                    if (tProperty.draw) {
                        //console.log("render", i, tProperty.draw)
                        tContext.save();
                        tContext.scale(tProperty.scaleX, tProperty.scaleY);
                        tContext.translate(tProperty.x / tProperty.scaleX, tProperty.y / tProperty.scaleX);
                        //tContext.rotate(Math.PI/180*45);
                        tContext.drawImage(tProperty.draw, 0, 0);
                        tContext.restore();
                    }
                }

                //var delta = new Date().getTime() - start;

            }
        }
    });
}).call(engine);