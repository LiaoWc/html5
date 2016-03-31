window.custom = window.custom || {};
custom.ui_inspector_property = function (args) {
    var manager = engine.manager;
    //Key
    var button = (function () {
        var entity = manager.newEntity();
        var node = entity.addComponent("node");
        //var parent = entity.addComponent("parent");
        var rect = entity.addComponent("rect");
        rect.property.width = 200;
        rect.property.height = 100;
        rect.property.lineColor = Colors.get("white");
        rect.property.lineWidth = 2;
        rect.property.fillColor = Colors.get("ui_button_editor_bg");
        rect.update();

        //var mouse = entity.addComponent("mouse");
        //mouse.property.width = rect.property.width
        //mouse.property.height = rect.property.height;
        //mouse.property.callback = function (args) {
        //    if (args.state == "leftDown") {
        //        //console.log("newEntity");
        //        node.property.scaleX = 0.8;
        //        node.property.scaleY = 0.8;
        //        node.update();
        //        return true;
        //    } else if (args.state == "leftUp") {
        //        node.property.scaleX = 1;
        //        node.property.scaleY = 1;
        //        node.update();
        //    }
        //};
        //mouse.update();

        return entity;
    })();
    //ValueType
    var key = (function () {
        var entity = manager.newEntity();
        var node = entity.addComponent("node");
        //node.property.y = 30;
        node.update();
        var parent = entity.addComponent("parent");
        parent.property.entity = button;
        parent.update();
        var text = entity.addComponent("text");
        text.property.fillText = Words.get("Key");
        text.property.fontColor = Colors.get("white");
        text.property.fontSize = 25;
        text.update();
        //var input = entity.addComponent("input");
        //input.property.fillText = Words.get("Key");
        //input.property.fontColor = Colors.get("white");
        //input.property.fontSize = 25;
        //input.update();
        return entity;
    })();
    //ValueType
    (function () {
        var entity = manager.newEntity();
        var node = entity.addComponent("node");
        node.property.x = 50;
        node.update();
        var parent = entity.addComponent("parent");
        parent.property.entity = key;
        parent.update();
        var input = entity.addComponent("input");
        input.property.width = 100;
        input.property.height = 30;
        input.property.fontSize = 25;
        input.update();
    })();
    //DefaultValue

    return button;
}