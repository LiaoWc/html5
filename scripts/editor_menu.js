window.custom = window.custom || {};
custom.editor_menu = function () {
    var manager = engine.manager;
    var editor = manager.getEntityByFlag("editor");
    (function () {
        var entity = manager.newEntity();
        entity.setFlag("editor_menu");
        var node = entity.addComponent("node");
        var parent = entity.addComponent("parent");
        var editor = manager.getEntityByFlag("editor");
        parent.property.entity = editor;
        parent.update();
        var rect = entity.addComponent("rect");
        rect.property.width = editor.components.size.property.width;
        rect.property.height = 50;
        rect.property.lineColor = Colors.get("white");
        rect.property.lineWidth = 2;
        rect.property.fillColor = Colors.get("editor_menu");
        rect.update();
        var resize = entity.addComponent("resize");
        resize.property.callback = function () {
            rect.property.width = editor.components.size.property.width;
            rect.property.height = 50;
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
        parent.property.entity = manager.getEntityByFlag("editor_menu");
        parent.update();
        var text = entity.addComponent("text");
        text.property.fillText = Words.get("Menu");
        text.property.fontColor = Colors.get("white");
        text.property.fontSize = 40;
        text.update();
    })();
}