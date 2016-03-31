window.custom = window.custom || {};
custom.editor_inspector = function () {
    var manager = engine.manager;
    var canvas = engine.getCanvas();
    var editor = manager.getEntityByFlag("editor");
    var editor_menu = manager.getEntityByFlag("editor_menu");
    (function () {
        var entity = manager.newEntity();
        entity.setFlag("editor_inspector");
        var node = entity.addComponent("node");
        node.property.x = canvas.width - 300;
        node.property.y = editor_menu.components.rect.property.height;
        node.update();

        var inspector = entity.addComponent("inspector");

        var parent = entity.addComponent("parent");
        parent.property.entity = editor;
        parent.update();
        var rect = entity.addComponent("rect");
        rect.property.width = 300;
        rect.property.height = editor.components.rect.property.height - node.property.y;
        rect.property.lineColor = Colors.get("white");
        rect.property.lineWidth = 2;
        rect.property.fillColor = Colors.get("editor_menu");
        rect.update();
        var resize = entity.addComponent("resize");
        resize.property.callback = function () {
            node.property.x = canvas.width - 200;
            node.property.y = editor_menu.components.rect.property.height;
            node.update();
            rect.property.height = editor.components.rect.property.height - node.property.y;
            rect.update();
        };
        resize.update();
    })();
    (function () {
        var entity = manager.newEntity();
        var node = entity.addComponent("node");
        node.property.x = 5;
        //node.property.y = 30;
        node.update();
        var parent = entity.addComponent("parent");
        parent.property.entity = manager.getEntityByFlag("editor_inspector");
        parent.update();
        var text = entity.addComponent("text");
        text.property.fillText = Words.get("Inspector");
        text.property.fontColor = Colors.get("white");
        text.property.fontSize = 30;
        text.update();
    })();

    //(function () {
    //    var editor_inspector = manager.getEntityByFlag("editor_inspector");
    //    var button = custom.ui_button_editor({
    //        width: 190,
    //        height: 50,
    //        word: Words.get("Add Property"),
    //        callback: function () {
    //            console.log("Add Property");
    //        }
    //    });
    //    var parent = button.addComponent("parent");
    //    parent.property.entity = editor_inspector;
    //    parent.update();
    //    button.components.node.property.x = 5;
    //    button.components.node.property.y = 50;
    //    button.components.node.update();
    //
    //    //var ui =  custom.ui_inspector_property();
    //    //var parent = ui.addComponent("parent");
    //    //parent.property.entity = editor_inspector;
    //    //parent.update();
    //    //ui.components.node.property.y = 100;
    //    //ui.components.node.update();
    //})();


}