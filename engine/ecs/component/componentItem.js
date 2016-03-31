window.engine = window.engine || {};
(function () {
    engine.registerComponent = engine.registerComponent || [];
    this.registerComponent.push({
        name: "zOrder",
        property: [
            {key: 'z', value: 0},
            {key: "timestamp", value: 0},
        ]
    });

    engine.registerSystem = engine.registerSystem || [];
    this.registerSystem.push({
        name: "zOrder",
        priority: -3,
        systemComponent: ["zOrder"],
        onInit: function () {
            this.timestamp = 0;
            this.root = [];
            this.rootSort = function (a, b) {
                var aZ = a.getComponent({name: "zOrder"}).property;
                var bZ = b.getComponent({name: "zOrder"}).property;
                if (aZ.z > bZ.z) {
                    return true;
                } else if (aZ.z == bZ.z) {
                    if (aZ.timestamp < bZ.timestamp) {
                        return true;
                    }
                }
                return false;
            }
        },
        onAdd: function (args) {
            args.component.property.timestamp = ++this.timestamp;
            this.root.push(args.component.entity);
            this.root.sort(this.rootSort);
            console.log(args.component.property.z)
        },
        onRemove: function (args) {
        },
        onUpdate: function (args) {
            args.component.property.timestamp = ++this.timestamp;
            console.log(args.component.property.z);
            this.root.sort(this.rootSort);

        },
        onLoop: function (aDelta) {
            if (this.beUpdated) {
                //var updatedComponents = this.getUpdatedComponents();
                for (var i in this.updatedComponents) {
                    var tEntity = engine.manager.getEntityById(i);
                    var tRender = tEntity.getComponent("render");
                    var zOrder = tEntity.getComponent({name: "zOrder"});
                    tRender.property.z = zOrder.property.z;
                    tRender.property.timestamp = zOrder.property.timestamp;
                    tRender.update();
                }
                //console.log(this.root);
            }
        }
    });
}).call(engine);