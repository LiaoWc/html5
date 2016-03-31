window.engine = window.engine || {};
(function () {
    engine.registerComponent = engine.registerComponent || [];
    this.registerComponent.push({
        name: "hierarchy",
        property: [
            {key: 'z', value: 0},
            {key: "timestamp", value: 0},
        ]
    });

    engine.registerSystem = engine.registerSystem || [];
    this.registerSystem.push({
        name: "hierarchy",
        priority: -10,
        systemComponent: ["hierarchy"],
        onInit: function () {
            this.timestamp = 0;
            this.root = [];
        },
        onAdd: function (args) {
            var tComponent = args.component;
            var tProperty = tComponent.property;
            tProperty.timestamp = ++this.timestamp;
            //console.log(this.timestamp, this.root.length)
            var add = false;
            for (var i = 0; i < this.root.length; i++) {
                //console.log(tProperty.timestamp, this.root[i].components.hierarchy.property.timestamp)
                if (tProperty.timestamp > this.root[i].components.hierarchy.property.timestamp) {
                    this.root.splice(i, 0, args.component.entity);
                    add = true;
                    break;
                }
            }
            if (add == false) {
                this.root.push(args.component.entity);
            }
        },
        onRemove: function (args) {
            var tComponent = args.component;
            for (var i = 0; i < this.root.length; i++) {
                if (this.root[i] == tComponent.entity) {
                    this.root.splice(i, 1);
                }
            }
        },
        onUpdate: function (args) {
            this.onRemove(args);
            this.onAdd(args);
        },
        onLoop: function (aDelta) {
            if (this.beUpdated) {
                //var updatedComponents = this.getUpdatedComponents();
                console.log(this.updatedComponents,engine.manager)
                for (var i in this.updatedComponents) {
                    var tEntity = engine.manager.getEntityById(i);
                    var tRender = tEntity.getComponent("render");
                    var hierarchy = tEntity.getComponent("hierarchy");
                    tRender.property.z = hierarchy.property.z;
                    tRender.property.timestamp = hierarchy.property.timestamp;
                    tRender.update();
                }
                //console.log(this.root);
            }
        }
    });
}).call(engine);