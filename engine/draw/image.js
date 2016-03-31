window.engine = window.engine || {};
(function () {
    engine.registerComponent = engine.registerComponent || [];
    this.registerComponent.push({
        name: "image",
        needs: ["node"],
        property: [
            {key: 'file', value: ""},
            {key: 'src', value: null},
            {key: 'width', value: 0},
            {key: 'height', value: 0},
            {key: 'renderScale', value: null},
        ]
    });
    engine.registerSystem = engine.registerSystem || [];
    this.registerSystem.push({
        name: "image",
        priority: 5,
        systemComponent: ["image"],
        onInit: function () {
        },
        onAdd: function (args) {
        },
        onRemove: function (args) {
        },
        onUpdate: function (args) {
            //console.log("image", args);
            args.component.property.src = engine.getPreload().getResource(args.component.property.file);
            args.component.property.width = args.component.property.src.width;
            args.component.property.height = args.component.property.src.height;
        },
        onLoop: function (aDelta) {

            var renderUpdatedComponents = engine.manager.systems.render.updatedComponents;
            for (var i in renderUpdatedComponents) {
                this.updatedComponents[i] = true;
            }
            for (var i in this.updatedComponents) {

                var tEntity = engine.manager.getEntityById(i);
                var tRender = tEntity.getComponent("render");
                var tRenderProperty = tRender.property;
                var tImage = tEntity.getComponent({name: "image"});
                if (tImage && tImage.property.renderScale != tRenderProperty.scaleX) {

                    var tImageProperty = tImage.property;
                    var tResource = tImage.property.src;
                    if (tImage != null) {
                        tImage.property.renderScale = tRenderProperty.scaleX;
                        //tRenderProperty.x += -tResource.width * tImageProperty.anchorPointX;
                        //tRenderProperty.y += -tResource.height * tImageProperty.anchorPointY;
                        var tCanvas = document.createElement('canvas');
                        tCanvas.width = tResource.width * tRenderProperty.scaleX;
                        tCanvas.height = tResource.height * tRenderProperty.scaleX;
                        var tContext = tCanvas.getContext("2d");
                        tContext.scale(tRenderProperty.scaleX, tRenderProperty.scaleY);
                        tContext.drawImage(tResource, 0, 0);
                        tRenderProperty.draw = tCanvas;
                        tRender.update();
                    }
                }

            }
        }
    });
}).call(engine);