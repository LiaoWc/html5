window.custom = window.custom || {};
custom.ui_component_toggle = function (args) {
    args = args || {};
    var width = args.width;
    var height = args.height;
    var word = args.word;
    var callback = args.callback;
    var manager = engine.manager;
    //toggle
    var toggle = (function () {
        var entity = manager.newEntity();
        var node = entity.addComponent("node");
        var rect = entity.addComponent("rect");
        rect.property.width = width;
        rect.property.height = height;
        rect.property.fillColor = Colors.get("rgba(210,101,88,0)");
        rect.update();

        var isSelected = false;
        var mouse = entity.addComponent("mouse");
        mouse.property.width = rect.property.width
        mouse.property.height = rect.property.height;
        mouse.property.callback = function (args) {
            if (args.state == "leftDown") {
                //console.log("newEntity");
                return true;
            } else if (args.state == "leftUp") {
                callback();
                if (isSelected) {
                    rect.property.fillColor = Colors.get("rgba(210,101,88,0)");
                    rect.update();
                    isSelected = false;
                } else {
                    rect.property.fillColor = Colors.get("rgba(210,101,88,0.8)");
                    rect.update();
                    isSelected = true;
                }
            }
        };
        mouse.update();
        return entity;
    })();
    //word
    (function () {
        var entity = manager.newEntity();
        var node = entity.addComponent("node");
        //node.property.y = 30;
        //node.update();
        var parent = entity.addComponent("parent");
        parent.property.entity = toggle;
        parent.update();
        var text = entity.addComponent("text");
        text.property.fillText = Words.get(word);
        text.property.fontColor = Colors.get("white");
        text.property.fontSize = height;
        text.update();

        var scale = Math.min(1, (width - 10) / text.property.width);
        console.log(text.property.width)
        node.property.scaleX = scale;
        node.property.scaleY = scale;
        node.property.x = width / 2 - text.property.width / 2 * scale;
        node.property.y = height / 2 - text.property.height / 2 * scale;
        node.update();
    })();
    return toggle;
}