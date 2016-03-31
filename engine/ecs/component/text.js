window.engine = window.engine || {};
(function () {
    engine.registerComponent = engine.registerComponent || [];
    this.registerComponent.push({
        name: "text",
        needs: ["node"],
        property: [
            {key: 'fillText', value: ''},
            {key: 'fontSize', value: 30},
            {key: 'fontColor', value: '#fff'},
            {key: 'fontName', value: 'sys'},
            {key: 'height', value: 0},
            {key: 'width', value: 0},
            //{key: 'renderScale', value: null},
            //{key: 'sentence', value: []},
            {key: 'draw', value: null},
            {key: 'frameWidth', value: null},
            {key: 'frameHeight', value: null},
        ]
    });
    engine.registerSystem = engine.registerSystem || [];
    this.registerSystem.push({
        name: "text",
        priority: 5,
        systemComponent: ["text"],
        onUpdate: function (args) {

            var tComponent = args.component;
            var tProperty = tComponent.property;

            var tCanvas = document.createElement('canvas');
            var tContext = tCanvas.getContext("2d");
            tContext.font = "normal " + tProperty.fontSize + "px " + tProperty.fontName;
            tContext.fillStyle = tProperty.fontColor;
            tContext.textBaseline = "top";


            if (tProperty.frameWidth != null) {
                if (tProperty.frameHeight != null) {

                } else {
                    var strWidth = 0;
                    var line = 0;
                    var count = 0;
                    while (true) {
                        if (count == tProperty.fillText.length) {
                            break;
                        }
                        var char = tProperty.fillText[count];
                        var charWidth = tContext.measureText(char).width;
                        if (strWidth + charWidth < tProperty.frameWidth) {
                            //tContext.fillText(char, strWidth, line * tProperty.fontSize);
                            //tProperty.renderTexts.push(tProperty.fillText);
                            strWidth += charWidth;
                            ++count;
                        } else {
                            ++line;
                            strWidth = 0;
                        }
                    }
                    tProperty.width = tProperty.frameWidth;
                    tProperty.height = line * tProperty.fontSize;
                }
            } else {
                //console.log(tContext)
                tProperty.width = tContext.measureText(tProperty.fillText).width;
                tProperty.height = tProperty.fontSize;
                tCanvas.width = tProperty.width;
                tCanvas.height = tProperty.height;
                tContext.font = "normal " + tProperty.fontSize + "px " + tProperty.fontName;
                tContext.fillStyle = tProperty.fontColor;
                tContext.textBaseline = "top";
                tContext.fillText(tProperty.fillText, 0, 0);
                //tProperty.sentence.push(tProperty.fillText);
            }

            tProperty.draw = tCanvas;
        },
        onLoop: function (aDelta) {
            if (this.beUpdated) {
                for (var i in this.updatedComponents) {
                    var tEntity = engine.manager.getEntityById(i);
                    var tComponent = this.components[i];
                    if (tComponent) {
                        var tProperty = tComponent.property;
                        var tRender = tEntity.getComponent("render");
                        var tRenderProperty = tRender.property;
                        tRenderProperty.draw = tProperty.draw;
                        tRender.update();
                    }
                }
            }
        }
    });
}).call(engine);