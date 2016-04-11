window.engine = window.engine || {};
(function () {
    engine.registerComponent = engine.registerComponent || [];
    this.registerComponent.push({
        name: "domImage",
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
        name: "domImage",
        priority: 5,
        systemComponent: ["domImage"],
        //onInit: function () {
        //},
        onAdd: function (aComponent) {
            var element = document.createElement("img");
            element.style.position = "absolute";
            element.style.zIndex = 3;
            document.body.appendChild(element);
            aComponent.property.element = element;
            var self = this;
            window.addEventListener("touchstart", function () {
                if (engine.manager.entitiesWithTag["works"].enabled == true) {
                    for (var i in self.components) {
                        self.components[i].property.element.style.visibility = "visible";
                    }
                }
            }, true)
            element.addEventListener('touchstart', function (event) {
                for (var i in self.components) {
                    if (self.components[i] == aComponent) {

                    } else {
                        self.components[i].property.element.style.visibility = "hidden";
                    }
                }
            }, true);
            element.addEventListener('touchend', function (event) {
                for (var i in self.components) {
                    self.components[i].property.element.style.visibility = "visible";
                }
            }, false);

        },
        //onRemove: function (aComponent) {
        //},
        onUpdate: function (aComponent) {
            var img = app.resource[aComponent.property.file];

            var element = aComponent.property.element;
            if (element && img) {
                element.src = img.src;
                aComponent.property.width = img.width;
                aComponent.property.height = img.height;
                element.style.top = -img.height;
                //console.log(element, aComponent.property.file)

                aComponent.property.drawCall = function (aCanvas) {
                    var context = aCanvas.getContext("2d");
                    var comRender = aComponent.entity.components.render;
                    context.save();
                    element.src = img.src;
                    element.style.visibility = aComponent.property.visibility;
                    element.style.opacity = comRender.property.alpha;
                    element.style.width = aComponent.property.width * comRender.property.scaleX;
                    element.style.height = aComponent.property.height * comRender.property.scaleY;

                    element.style.rotation = Math.PI / 180 * comRender.property.rotation;
                    //context.translate(comRender.property.x * engine.dpr, comRender.property.y * engine.dpr);
                    //context.scale(comRender.property.scaleX * engine.dpr, comRender.property.scaleX * engine.dpr);
                    //context.rotate(Math.PI / 180 * comRender.property.rotation);
                    var comNode = aComponent.entity.components.node;
                    var dx = aComponent.property.width * comRender.property.scaleX * comNode.property.anchorPointX;
                    var dy = aComponent.property.height * comRender.property.scaleY * comNode.property.anchorPointY;

                    element.style.left = comRender.property.x - dx;
                    element.style.top = comRender.property.y - dy;
                    //context.drawImage(img, -dx, -dy);
                    //context.restore();
                }
            } else {
                console.error("image", aComponent.property.file, "not preload");
            }
        },
        onLoop: function (aDelta) {
            for (var i in this.updatedComponents) {
                this.updatedComponents[i].entity.components.render.property.drawCall = this.updatedComponents[i].property.drawCall;
            }
        }
    });
}).call(engine);