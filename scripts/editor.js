window.custom = window.custom || {};
custom.editor = function () {
    var canvas = engine.getCanvas();
    var manager = engine.manager;
    (function () {
        var entity = manager.newEntity();
        entity.setFlag("editor");
        var node = entity.addComponent("node");

        var size = entity.addComponent("size");
        size.property.width = canvas.width;
        size.property.height = canvas.height;
        size.update();

        var rect = entity.addComponent("rect");
        rect.property.width = canvas.width;
        rect.property.height = canvas.height;
        rect.property.fillColor = Colors.get("editor_bg");
        rect.update();

        var resize = entity.addComponent("resize");
        resize.property.callback = function () {

            size.property.width = canvas.width;
            size.property.height = canvas.height;
            size.update();

            rect.property.width = size.property.width;
            rect.property.height = size.property.height;
            rect.update();
        };
        resize.update();

        //entity.removeSelf();
    })();
}