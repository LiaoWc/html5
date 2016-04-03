window.engine = window.engine || {};
(function() {
    engine.registerComponent = engine.registerComponent || [];
    this.registerComponent.push({
        name: "hierarchy",
        property: [
            { key: 'level', value: 0 },
            { key: "timestamp", value: 0 },
        ]
    });

    engine.registerSystem = engine.registerSystem || [];
    this.registerSystem.push({
        name: "hierarchy",
        priority: 4,
        systemComponent: ["hierarchy"],
        onInit: function() {
            this.timestamp = 0;
        },
        onAdd: function(aComponent) {
            aComponent.property.timestamp = ++this.timestamp;
        },
        onUpdate: function(aComponent) {
            aComponent.property.timestamp = ++this.timestamp;
        },
        onLoop: function(aDelta) {
            if (this.beUpdated) {
                for (var i in this.updatedComponents) {
                    var comHierarchy = this.updatedComponents[i];
                    var comRender = comHierarchy.entity.components.render;
                    comRender.property.level = comHierarchy.property.level;
                    comRender.property.timestamp = comHierarchy.property.timestamp;
                    comRender.update();
                }
            }
        }
    });
}).call(engine);