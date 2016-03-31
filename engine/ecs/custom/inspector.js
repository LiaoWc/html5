window.engine = window.engine || {};
(function () {
    engine.registerComponent = engine.registerComponent || [];
    this.registerComponent.push({
        name: "inspector",
        needs: ["node"],
        property: [
            {key: 'type', value: null},
            {key: 'name', value: null},
            {key: 'items', value: {}},
            {key: 'count', value: 0},
            {key: 'itemWidth', value: 200},
            {key: 'itemHeight', value: 30},
        ]
    });

    engine.registerSystem = engine.registerSystem || [];
    this.registerSystem.push({
        name: "inspector",
        priority: 10,
        systemComponent: ["inspector"],
        onInit: function () {

        },
        onAdd: function (args) {
            var tComponent = args.component;
        },
        onRemove: function (args) {
        },
        onUpdate: function (args) {
            //console.log(args.component)
            var inspector = args.component;
            var property = inspector.property;
            switch (property.type) {
                case "components":
                    //console.log("components", engine.manager.registerComponents[property.name]);
                    var componentProperty = engine.manager.registerComponents[property.name].property;
                    for (var i = 0; i < componentProperty.length; i++) {
                        console.log(componentProperty[i]);

                        var entity = engine.manager.newEntity();
                        //items[i] = entity;
                        var node = entity.addComponent("node");
                        node.property.y = 40 * i;
                        node.update();
                        var text = entity.addComponent("text");
                        text.property.fillText = Words.get(componentProperty[i].key);
                        text.property.fontColor = Colors.get("white");
                        text.property.fontSize = 30;
                        text.update();

                        var parent = entity.addComponent("parent");
                        parent.property.entity = inspector.entity;
                        parent.update();

                    }
                    break;
            }
        },
        onLoop: function (aDelta) {
            if (this.beUpdated) {
            }
        }
    });
}).call(engine);