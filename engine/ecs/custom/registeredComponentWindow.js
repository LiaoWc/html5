window.engine = window.engine || {};
(function () {
    engine.registerComponent = engine.registerComponent || [];
    this.registerComponent.push({
        name: "registeredComponentWindow",
        needs: ["node"],
        property: [
            {key: 'register', value: false},
            {key: 'remove', value: false},
            {key: 'choose', value: null},
            {key: 'items', value: {}},
            {key: 'count', value: 0},
            {key: 'itemWidth', value: 200},
            {key: 'itemHeight', value: 30},
        ]
    });

    //this.registerComponent.push({
    //    name: "registeredComponentWindowItem",
    //    needs: ["node"],
    //    property: [
    //        {key: 'name', value: "New Component"},
    //        {key: 'textEntity', value: null},
    //        {key: 'callback', value: false},
    //        {key: 'mouseEntity', value: null},
    //        {key: 'windowEntity', value: null},
    //    ]
    //});

    engine.registerSystem = engine.registerSystem || [];
    this.registerSystem.push({
        name: "registeredComponentWindow",
        priority: 10,
        systemComponent: ["registeredComponentWindow"],
        onInit: function () {
            this.newItem = function (args) {
                //console.log(args);
                var aName = args.name;
                var aParent = args.parent;
                var entity = engine.manager.newEntity();
                //items[i] = entity;
                var node = entity.addComponent("node");
                node.property.y = args.y;
                node.update();
                var text = entity.addComponent("text");
                text.property.fillText = Words.get(aName);
                text.property.fontColor = Colors.get("white");
                text.property.fontSize = args.itemHeight;
                text.update();

                //var scale = Math.min(1, (args.itemWidth - 10) / text.property.width);
                //node.property.scaleX = scale;
                //node.property.scaleY = scale;


                var parent = entity.addComponent("parent");
                parent.property.entity = aParent;
                parent.update();

                var mouse = entity.addComponent("mouse");
                mouse.property.width = args.itemWidth;
                mouse.property.height = args.itemHeight;
                mouse.property.callback = function (args) {
                    if (args.state == "leftDown") {
                        console.log(aName);
                        aParent.components.registeredComponentWindow.property.choose = aName;
                        aParent.components.registeredComponentWindow.update();
                        return true;
                    } else if (args.state == "leftUp") {
                    }
                };
                mouse.update();
                return entity;
            };
        },
        onAdd: function (args) {
            var tComponent = args.component;
        },
        onRemove: function (args) {
        },
        onUpdate: function (args) {
            //console.log(args.component)
            var tComponent = args.component;
            var items = tComponent.property.items;
            //console.log(tComponent.property.choose);
            if (tComponent.property.register) {
                tComponent.property.count += 1;
                items["New Component" + tComponent.property.count] = true;
                tComponent.property.register = false;
            }
            var count = 0;
            for (var i in items) {
                var item = items[i];
                if (item == true) {
                    item = items[i] = this.newItem({
                        name: i,
                        y: count * 40,
                        itemWidth: tComponent.property.itemWidth,
                        itemHeight: tComponent.property.itemHeight,
                        parent: tComponent.entity,
                    })
                }
                if (tComponent.property.choose == i) {
                    //item.components.rect.property.fillColor
                }
                count += 1;
            }
            tComponent.property.choose = null;
        },
        onLoop: function (aDelta) {
            if (this.beUpdated) {
            }
        }
    });
}).call(engine);