window.custom = window.custom || {};
custom.editor_project = function () {
    var manager = engine.manager;
    var editor = manager.getEntityByFlag("editor");
    var editor_menu = manager.getEntityByFlag("editor_menu");
    (function () {
        var entity = manager.newEntity();
        entity.setFlag("editor_project");
        var node = entity.addComponent("node");
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
            console.log(args);
            if (args.state == "leftDown") {
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
    (function () {
        var entity = manager.newEntity();
        entity.setFlag("editor_menu_label");
        var node = entity.addComponent("node");
        node.property.x = 5;
        node.update();
        var parent = entity.addComponent("parent");
        parent.property.entity = manager.getEntityByFlag("editor_project");
        parent.update();
        var text = entity.addComponent("text");
        text.property.fillText = Words.get("Entity");
        text.property.fontColor = Colors.get("white");
        text.property.fontSize = 20;
        text.update();
    })();

    (function () {
        var entity = manager.newEntity();
        entity.setFlag("editor_menu_label");
        var node = entity.addComponent("node");
        node.property.x = 150;
        node.update();
        var parent = entity.addComponent("parent");
        parent.property.entity = manager.getEntityByFlag("editor_project");
        parent.update();
        var text = entity.addComponent("text");
        text.property.fillText = Words.get("+");
        text.property.fontColor = Colors.get("white");
        text.property.fontSize = 20;
        text.update();
        var mouse = entity.addComponent("mouse");
        mouse.property.width = 20;
        mouse.property.height = 20;
        mouse.property.callback = function (args) {
            if (args.state == "leftDown") {
                //console.log("newEntity");
                return true;
            }else if (args.state == "leftUp") {
                console.log("newEntity");
            }
        };
        mouse.update();
    })();
}