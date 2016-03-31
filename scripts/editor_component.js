window.custom = window.custom || {};
custom.editor_component = function () {
    var manager = engine.manager;
    var editor = manager.getEntityByFlag("editor");
    var editor_menu = manager.getEntityByFlag("editor_menu");
    var editor_project = manager.getEntityByFlag("editor_project");

    //bg
    (function () {
        var entity = manager.newEntity();
        entity.setFlag("editor_component");
        var node = entity.addComponent("node");
        node.property.x = editor_project.components.rect.property.width;
        node.property.y = editor_menu.components.rect.property.height;
        node.update();
        var parent = entity.addComponent("parent");
        parent.property.entity = editor;
        parent.update();
        var rect = entity.addComponent("rect");
        rect.property.width = 200;
        rect.property.height = editor.components.rect.property.height - node.property.y;
        rect.property.lineColor = Colors.get("white");
        rect.property.lineWidth = 2;
        rect.property.fillColor = Colors.get("editor_menu");
        rect.update();

        var mouse = entity.addComponent("mouse");
        mouse.property.width = rect.property.width;
        mouse.property.height = rect.property.height;
        mouse.property.callback = function (args) {
            if (args.state == "leftDown") {
                return true;
            }
            if (args.state == "rightDown") {
                console.log("component menu")
                return true;
            }
        };
        mouse.update();
        var resize = entity.addComponent("resize");
        resize.property.callback = function () {
            rect.property.width = 200;
            rect.property.height = editor.components.rect.property.height - node.property.y;
            rect.update();
        };
        resize.update();
    })();
    //title
    (function () {
        var entity = manager.newEntity();
        var node = entity.addComponent("node");
        node.property.x = 5;
        node.update();
        var parent = entity.addComponent("parent");
        parent.property.entity = manager.getEntityByFlag("editor_component");
        parent.update();
        var text = entity.addComponent("text");
        text.property.fillText = Words.get("Component");
        text.property.fontColor = Colors.get("white");
        text.property.fontSize = 30;
        text.update();
    })();


    //window
    var registeredComponentWindow = (function () {
        var entity = manager.newEntity();
        var node = entity.addComponent("node");
        node.property.x = 10;
        node.property.y = 50;
        node.update();
        var parent = entity.addComponent("parent");
        parent.property.entity = manager.getEntityByFlag("editor_component");
        parent.update();
        return entity;
    })();

    var createItem = function (args) {
        var aName = args.name;
        var aParent = args.parent;
        var aItemWidth = args.itemWidth;
        var aItemHeight = args.itemHeight;

        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");
        node.property.y = args.y;
        node.update();

        var text = entity.addComponent("text");
        text.property.fillText = Words.get(aName);
        text.property.fontColor = Colors.get("white");
        text.property.fontSize = aItemHeight;
        text.update();

        var parent = entity.addComponent("parent");
        parent.property.entity = aParent;
        parent.update();

        var mouse = entity.addComponent("mouse");
        mouse.property.width = aItemWidth;
        mouse.property.height = aItemHeight;
        mouse.property.callback = function (args) {
            if (args.state == "leftDown") {
                console.log(aName);
                var tNode = selectedRect.components.node;
                tNode.property.y = -5 + node.property.y;
                tNode.update();
                var editor_inspector = manager.getEntityByFlag("editor_inspector");
                editor_inspector.components.inspector.property.type = "components";
                editor_inspector.components.inspector.property.name = aName;
                editor_inspector.components.inspector.update();
                return true;
            } else if (args.state == "leftUp") {
            }
        };
        mouse.update();
        //console.log(entity)
        return entity;
    };
    var selectedRect = function () {
        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");
        node.property.x = -5;
        node.property.y = -5;
        node.update();

        var rect = entity.addComponent("rect");
        rect.property.width = 190;
        rect.property.height = 40;
        rect.property.fillColor = Colors.get("rgba(210,101,88,1)");
        rect.update();

        var parent = entity.addComponent("parent");
        parent.property.entity = registeredComponentWindow;
        parent.update();

        return entity;
    }();
    var components = {};
    var count = 0;
    for (var i in engine.manager.registerComponents) {
        components[i] = createItem({
            name: i,
            parent: registeredComponentWindow,
            itemWidth: 200,
            itemHeight: 30,
            y: 40 * count
        });
        count += 1;
    }

    //添加component的按钮
    //(function () {
    //    var editor_component = manager.getEntityByFlag("editor_component");
    //    var button = custom.ui_button_editor({
    //        width: 190,
    //        height: 30,
    //        word: Words.get("Register Component"),
    //        callback: function () {
    //            console.log("Register Component", editor_component.components);
    //            registeredComponentWindow.components.registeredComponentWindow.property.register = true;
    //            registeredComponentWindow.components.registeredComponentWindow.update();
    //        }
    //    });
    //    var parent = button.addComponent("parent");
    //    parent.property.entity = editor_component;
    //    parent.update();
    //    button.components.node.property.x = 5;
    //    button.components.node.property.y = editor_component.components.rect.property.height - 70;
    //    button.components.node.update();
    //
    //    var resize = button.addComponent("resize");
    //    resize.property.callback = function () {
    //        button.components.node.property.x = 5;
    //        button.components.node.property.y = editor_component.components.rect.property.height - 70;
    //        button.components.node.update();
    //    };
    //    resize.update();
    //})();
    //////移除component的按钮
    //(function () {
    //    var editor_component = manager.getEntityByFlag("editor_component");
    //    var button = custom.ui_button_editor({
    //        width: 190,
    //        height: 30,
    //        word: Words.get("Remove Component"),
    //        callback: function () {
    //            console.log("Remove Component");
    //        }
    //    });
    //    var parent = button.addComponent("parent");
    //    parent.property.entity = editor_component;
    //    parent.update();
    //    button.components.node.property.x = 5;
    //    button.components.node.property.y = editor_component.components.rect.property.height - 35;
    //    button.components.node.update();
    //
    //    var resize = button.addComponent("resize");
    //    resize.property.callback = function () {
    //        button.components.node.property.x = 5;
    //        button.components.node.property.y = editor_component.components.rect.property.height - 35;
    //        button.components.node.update();
    //    };
    //    resize.update();
    //})();

}