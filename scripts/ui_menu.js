window.custom = window.custom || {};
custom.ui_menu = function (args) {
    args = args || {};
    var width = args.width;
    var itemHeight = args.height;
    var itemSpace = 5;
    var items = [
        {name:Words.get("Register Component"),callback:function(){
            console.log("Register Component")
        }}
    ]
    var manager = engine.manager;

    //button
    var button = (function () {
        var entity = manager.newEntity();
        var node = entity.addComponent("node");

        var mouse = entity.addComponent("mouse");
        mouse.property.width = width;
        mouse.property.height = height;
        mouse.property.callback = function (args) {
            var tNode = entityView.components.node;
            if (args.state == "leftDown") {
                //console.log("newEntity");
                tNode.property.scaleX = 0.95;
                tNode.property.scaleY = 0.95;
                tNode.update();
                return true;
            } else if (args.state == "leftUp") {
                tNode.property.scaleX = 1;
                tNode.property.scaleY = 1;
                tNode.update();
                callback();
            }
        };
        mouse.update();

        return entity;
    })();


    //ui
    var entityView = (function () {
        var entity = manager.newEntity();
        var node = entity.addComponent("node");
        node.property.x = width / 2;
        node.property.y = height / 2;
        node.update();
        var parent = entity.addComponent("parent");
        parent.property.entity = button;
        parent.update();
        return entity;
    })();
    //bg
    (function () {
        var entity = manager.newEntity();
        var node = entity.addComponent("node");
        var parent = entity.addComponent("parent");
        parent.property.entity = entityView;
        parent.update();
        var rect = entity.addComponent("rect");
        rect.property.width = width;
        rect.property.height = height;
        rect.property.lineColor = Colors.get("white");
        rect.property.lineWidth = 2;
        rect.property.fillColor = Colors.get("ui_button_editor_bg");
        rect.update();

        node.property.x = -width / 2;
        node.property.y = -height / 2;

        return entity;
    })();
    (function () {
        var entity = manager.newEntity();
        var node = entity.addComponent("node");
        //node.property.y = 30;
        //node.update();
        var parent = entity.addComponent("parent");
        parent.property.entity = entityView;
        parent.update();
        var text = entity.addComponent("text");
        text.property.fillText = Words.get(word);
        text.property.fontColor = Colors.get("white");
        text.property.fontSize = height;
        text.update();
        console.log(text.property.width, text.property.height);

        var scale = Math.min(1, (width - 10) / text.property.width);
        node.property.scaleX = scale;
        node.property.scaleY = scale;
        node.property.x = -text.property.width / 2 * scale;
        node.property.y = -text.property.height / 2 * scale;
        node.update();
    })();

    return button;
}