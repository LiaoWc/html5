window.custom = window.custom || {};
custom.editor_stage = function () {
    var manager = engine.manager;
    var canvas = engine.getCanvas();
    var editor = manager.getEntityByFlag("editor");
    var editor_menu = manager.getEntityByFlag("editor_menu");
    (function () {
        var entity = manager.newEntity();
        entity.setFlag("editor_stage");
        var node = entity.addComponent("node");
        node.property.x = 200;
        node.property.y = editor_menu.components.rect.property.height;
        node.update();
        var parent = entity.addComponent("parent");
        parent.property.entity = editor;
        parent.update();
        var rect = entity.addComponent("rect");
        rect.property.width = canvas.width - 400;
        rect.property.height =  editor.components.rect.property.height - node.property.y;
        rect.property.lineColor = Colors.get("white");
        rect.property.lineWidth = 2;
        rect.property.fillColor = Colors.get("editor_menu");
        rect.update();
        var resize = entity.addComponent("resize");
        resize.property.callback = function () {
            node.property.x = 200;
            node.property.y = editor_menu.components.rect.property.height;
            node.update();
            rect.property.width = canvas.width - 400;
            rect.property.height =  editor.components.rect.property.height - node.property.y;
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
        parent.property.entity = manager.getEntityByFlag("editor_stage");
        parent.update();
        var text = entity.addComponent("text");
        text.property.fillText = Words.get("Stage");
        text.property.fontColor = Colors.get("white");
        text.property.fontSize = 20;
        text.update();
    })();
}