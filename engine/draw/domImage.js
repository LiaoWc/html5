window.engine = window.engine || {};
(function () {
    engine.registerComponent = engine.registerComponent || [];
    this.registerComponent.push({
        name: "image",
        needs: ["node"],
        property: [
            {key: 'file', value: null},
            {key: 'element', value: null},
            {key: 'drawCall', value: null},
            {key: 'width', value: 0},
            {key: 'height', value: 0},
        ]
    });
    engine.registerSystem = engine.registerSystem || [];
    this.registerSystem.push({
        name: "image",
        priority: 5,
        systemComponent: ["image"],
        //onInit: function () {
        //},
        onAdd: function (aComponent) {
            var element = document.createElement("image");
            element.style.position = "absolute";
            element.style.zIndex = 3;
            document.body.appendChild(element);
            aComponent.property.element = element;
        },
        //onRemove: function (aComponent) {
        //},
        onUpdate: function (aComponent) {
            var img = app.resource[aComponent.property.file];

            var element = aComponent.property.element;
            if (element) {
                element.src = aComponent.property.file;
                aComponent.property.width = img.width;
                aComponent.property.height = img.height;
                aComponent.property.drawCall = function (aCanvas) {
                    var context = aCanvas.getContext("2d");
                    var comRender = aComponent.entity.components.render;
                    context.save();
                    element.style.opacity = comRender.property.alpha;
                    element.style.width = aComponent.property.width * comRender.property.scaleX * engine.dpr;
                    element.style.height = aComponent.property.height * comRender.property.scaleY * engine.dpr;
                    element.style.left = comRender.property.x * engine.dpr;
                    element.style.top =  comRender.property.y * engine.dpr;
                    element.style.rotation = Math.PI / 180 * comRender.property.rotation;
                    //context.translate(comRender.property.x * engine.dpr, comRender.property.y * engine.dpr);
                    //context.scale(comRender.property.scaleX * engine.dpr, comRender.property.scaleX * engine.dpr);
                    //context.rotate(Math.PI / 180 * comRender.property.rotation);
                    //var comNode = aComponent.entity.components.node;
                    //var dx = comNode.property.width * comNode.property.anchorPointX;
                    //var dy = comNode.property.height * comNode.property.anchorPointY;
                    //context.drawImage(img, -dx, -dy);
                    //context.restore();
                }
            }
        },
        onLoop: function (aDelta) {
            for (var i in this.updatedComponents) {
                this.updatedComponents[i].entity.components.render.property.drawCall = this.updatedComponents[i].property.drawCall;
            }
        }
    });
}).call(engine);