window.engine = window.engine || {};
(function () {
    engine.registerComponent = engine.registerComponent || [];
    this.registerComponent.push({
        name: "text",
        needs: ["node"],
        property: [
            {key: 'fillText', value: 'Empty Text'},
            {key: "fontStyle", value: "normal"},//规定字体样式。可能的值：normal,italic,oblique
            {key: "fontVariant", value: "normal"},//规定字体变体。可能的值：normal,small-caps
            {key: "fontWeight", value: "normal"},//规定字体的粗细。可能的值：normal,bold,bolder,lighter,100~900
            {key: 'fontSize', value: 25},//规定字号和行高，以像素计。
            {key: 'fontFamily', value: 'system'},//规定字体系列
            {key: 'fontColor', value: '#fff'},//规定字体颜色
            {key: 'height', value: 0},
            {key: 'width', value: 0},
            {key: 'sentence', value: []},
            {key: 'cache', value: true},
            {key: 'cacheCanvas', value: null},
            {key: 'frameWidth', value: null},
            {key: 'frameHeight', value: null},
            {key: 'spaceY', value: 10},
        ]
    });
    engine.registerSystem = engine.registerSystem || [];

    //基础字号25，以25号字为基准进行计算字串的宽、高
    var DefaultFontSize = 25;

    this.registerSystem.push({
        name: "text",
        priority: 5,
        systemComponent: ["text"],
        onUpdate: function (aComponent) {
            //console.log("update")
            var cacheCanvas = aComponent.property.cacheCanvas;
            if (aComponent.property.cache) {
                if (cacheCanvas == null) {
                    aComponent.property.cacheCanvas = document.createElement("canvas");
                    cacheCanvas = aComponent.property.cacheCanvas
                }
            }

            (function drawText() {
                //通过一个dom元素得到字符的高度
                var pText = document.getElementById("text");
                pText.style.fontSize = DefaultFontSize;
                pText.style.fontFamily = aComponent.property.fontFamily;

                var context = cacheCanvas.getContext("2d");
                context.save();
                context.font = aComponent.property.fontStyle + " " +
                    aComponent.property.fontVariant + " " +
                    aComponent.property.fontWeight + " " +
                    25 + "px " +
                    aComponent.property.fontFamily;
                context.fillStyle = aComponent.property.fontColor;
                context.textBaseline = "top";

                aComponent.property.sentence = [];
                var fontScale = aComponent.property.fontSize / 25;
                if (aComponent.property.frameWidth != null) {
                    if (aComponent.property.frameHeight != null) {
                    } else {
                        var strWidth = 0;
                        var line = 0;
                        var count = 0;
                        var lineStr = "";
                        while (true) {
                            if (count == aComponent.property.fillText.length) {
                                if (lineStr != "") {
                                    ++line;
                                    aComponent.property.sentence.push(lineStr)
                                }
                                break;
                            }
                            var char = aComponent.property.fillText[count];
                            if (char == "\n") {
                                aComponent.property.sentence.push(lineStr)
                                lineStr = "";
                                ++line;
                                strWidth = 0;
                                ++count;
                            } else {
                                var charWidth = context.measureText(char).width;
                                if ((strWidth + charWidth) * fontScale < aComponent.property.frameWidth) {
                                    lineStr += char;
                                    strWidth += charWidth;
                                    ++count;
                                } else {
                                    //console.log(lineStr);
                                    aComponent.property.sentence.push(lineStr)
                                    lineStr = "";
                                    ++line;
                                    strWidth = 0;
                                }
                            }

                        }
                        //console.log(aComponent.property.sentence)
                        var textWidth = Math.min(aComponent.property.frameWidth, context.measureText(aComponent.property.fillText).width * fontScale);
                        var textHeight = (pText.clientHeight+ aComponent.property.spaceY) * line * fontScale ;
                        //console.log(textHeight, line)
                        aComponent.property.width = Math.ceil(textWidth);
                        aComponent.property.height = Math.ceil(textHeight);
                        context.restore();
                        cacheCanvas.width = 0;
                    }
                } else {
                    aComponent.property.sentence.push(aComponent.property.fillText);
                    var textWidth = context.measureText(aComponent.property.fillText).width * fontScale;
                    var textHeight = (pText.clientHeight+ aComponent.property.spaceY) * fontScale;

                    aComponent.property.width = Math.ceil(textWidth);
                    aComponent.property.height = Math.ceil(textHeight);
                    context.restore();
                    cacheCanvas.width = 0;
                }
            })();

            aComponent.property.drawCall = function (aCanvas) {
                var context = aCanvas.getContext("2d");
                var comRender = aComponent.entity.components.render;
                var comNode = aComponent.entity.components.node;
                var dx = extend.rounded(comNode.property.width * engine.dpr * comNode.property.anchorPointX);
                var dy = extend.rounded(comNode.property.height * engine.dpr * comNode.property.anchorPointY);

                var cacheCanvas = aComponent.property.cacheCanvas;
                if (cacheCanvas.width == 0) {
                    var fontScale = aComponent.property.fontSize / 25;
                    var cxt = cacheCanvas.getContext("2d");
                    var fontSize = aComponent.property.fontSize * engine.dpr;
                    if (fontScale < 1) {
                        fontSize = 25 * engine.dpr;
                    } else {
                        fontScale = 1;
                    }
                    //console.log(fontScale)
                    cacheCanvas.width = aComponent.property.width * engine.dpr;
                    cacheCanvas.height = aComponent.property.height * engine.dpr;
                    cacheCanvas.style.width = cacheCanvas.width / engine.dpr;
                    cacheCanvas.style.height = cacheCanvas.height / engine.dpr;
                    cxt.save();
                    if (fontScale < 1) {
                        cxt.scale(fontScale, fontScale);
                    }
                    cxt.font = aComponent.property.fontStyle + " " + aComponent.property.fontVariant + " " + aComponent.property.fontWeight + " " + fontSize + "px " + aComponent.property.fontFamily;
                    cxt.fillStyle = aComponent.property.fontColor;
                    cxt.textBaseline = "top";
                    var lineHeight = aComponent.property.height / aComponent.property.sentence.length;
                    for (var i = 0, len = aComponent.property.sentence.length; i < len; ++i) {
                        cxt.fillText(aComponent.property.sentence[i], 0, lineHeight * i / fontScale * engine.dpr);
                        //console.log("text", aComponent.property.sentence[i], cacheCanvas)
                    }
                    cxt.restore();
                }

                context.globalAlpha = comRender.property.alpha;
                context.save();
                context.rotate(Math.PI / 180 * comRender.property.rotation);
                context.translate(comRender.property.x * engine.dpr, comRender.property.y * engine.dpr);
                context.scale(comRender.property.scaleX, comRender.property.scaleY);
                //console.log(aComponent.property.cacheCanvas)
                context.drawImage(aComponent.property.cacheCanvas, -dx, -dy);
                context.restore();
            }
        },
        onLoop: function (aDelta) {
            if (this.beUpdated) {

                for (var i in this.updatedComponents) {
                    this.updatedComponents[i].entity.components.render.property.drawCall = this.updatedComponents[i].property.drawCall;
                    this.updatedComponents[i].entity.components.render.update();
                }
            }
        }
    });
}).call(engine);