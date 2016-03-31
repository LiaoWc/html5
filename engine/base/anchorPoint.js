window.engine = window.engine || {};
(function () {
    engine.registerComponent = engine.registerComponent || [];
    this.registerComponent.push({
        name: "anchorPoint",
        needs: ["size"],
        property: [
            {key: 'x', value: 0},
            {key: 'y', value: 0}
        ]
    });
    engine.registerSystem = engine.registerSystem || [];
    this.registerSystem.push({
        name: "anchorPoint",
        priority: 5,
        systemComponent: ["anchorPoint"],
        onInit: function () {
        },
        onAdd: function (args) {
        },
        onRemove: function (args) {
        },
        onUpdate: function (args) {
        },
        onLoop: function (aDelta) {
            //var updatedComponents = this.getUpdatedComponents();
            ////var renderUpdatedComponents = engine.manager.getSystem({name: "render"}).getUpdatedComponents();
            ////for (var i in renderUpdatedComponents) {
            ////    updatedComponents[i] = true;
            ////}
            //for (var i in updatedComponents) {
            //
            //    var tEntity = engine.manager.getEntityById(i);
            //    var tRender = tEntity.getComponent("render");
            //    var tRenderProperty = tRender.property;
            //    var tImage = tEntity.getComponent({name: "image"});
            //    if (tImage) {
            //        console.log("image", tRenderProperty);
            //        var tImageProperty = tImage.property;
            //        var tResource = engine.getPreload().getResource(tImageProperty.file);
            //        if (tImage != null) {
            //            //tRenderProperty.x += -tResource.width * tImageProperty.anchorPointX;
            //            //tRenderProperty.y += -tResource.height * tImageProperty.anchorPointY;
            //            var tCanvas = document.createElement('canvas');
            //            tCanvas.width = tResource.width * tRenderProperty.scaleX;
            //            tCanvas.height = tResource.height * tRenderProperty.scaleX;
            //            var tContext = tCanvas.getContext("2d");
            //            tContext.scale(tRenderProperty.scaleX, tRenderProperty.scaleY);
            //            tContext.drawImage(tResource, 0, 0);
            //            tRenderProperty.draw = tCanvas;
            //            tRender.update();
            //        }
            //    }
            //
            //}
        }
    });
}).call(engine);