window.app = window.app || {};
app.navigationBar = function () {
    console.log("app.navigationBar")
    var rootStage = engine.manager.entitiesWithTag["rootStage"];
    var sysEvent = engine.manager.registerSystems.event;
    var root = function () {
        var entity = engine.manager.newEntity();
        var comNode = entity.addComponent("node");
        var hierarchy = entity.components.hierarchy;
        hierarchy.property.level = 2;
        hierarchy.update();
        //comNode.property.x = 256 / 2;
        comNode.property.y = 20;
        //comNode.property.width = 256;
        //comNode.property.height = 256;
        //comNode.property.scaleX = 0.5;
        //comNode.property.scaleY = 0.5;
        comNode.property.alpha = 0.2;
        comNode.update();
        entity.addComponent("children");
        var rect = entity.addComponent("rect");
        rect.property.fillColor = "#000";

        engine.manager.registerSystems.children.addChild(rootStage, entity);


        return entity;
    }();

    //var barBtn = function (args) {
    //    var entity = engine.manager.newEntity();
    //    var node = entity.addComponent("node");
    //    var children = entity.addComponent("children");
    //    node.property.anchorPointX = 0.5;
    //    node.update();
    //    var text = entity.addComponent("text");
    //    text.property.fillText = args.name;
    //    text.property.fontSize = 20;
    //    text.update();
    //
    //    node.property.width = text.property.width;
    //    node.property.height = text.property.height;
    //    node.update();
    //
    //    engine.manager.registerSystems.children.addChild(root, entity);
    //    return entity;
    //}();

    var btnsProperty = [
        {name: "主页"},
        {name: "简历"},
        {name: "技能"},
        {name: "作品"},
        {name: "关于"}
    ];
    var btns = [];
    for (var i in btnsProperty) {
        var args = btnsProperty[i];
        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");
        //node.property.anchorPointX = 0.5;
        node.property.anchorPointY = 0.5;
        var text = entity.addComponent("text");
        text.property.fillText = args.name;
        text.property.fontSize = 25;
        text.update();
        engine.manager.registerSystems.children.addChild(root, entity);
        btns.push(entity);
    }

    var event = root.addComponent("event");
    sysEvent.listen(root, "rootStageResize", function (aEvent) {
        root.components.rect.property.width = aEvent.width;
        root.components.rect.property.height = 20;
        root.components.rect.update();
        var space = aEvent.width * 0.1;
        var fontSize = Math.min(aEvent.width * 0.1, aEvent.height * 0.05);

        for (var i = 0, len = btns.length; i < len; ++i) {
            var btn = btns[i];

            btn.components.text.property.fontSize = fontSize / 2;
            btn.components.text.update();
        }
        var oneWidth = btns[0].components.text.property.width;

        root.components.rect.property.height = btns[0].components.text.property.height;
        root.components.rect.update();
        console.log(oneWidth)
        var totalWidth = oneWidth * btns.length + space * (btns.length - 1);
        var startX = aEvent.width / 2 - totalWidth / 2;
        for (var i = 0, len = btns.length; i < len; ++i) {
            var btn = btns[i];
            btn.components.node.property.width = btn.components.text.property.width;
            btn.components.node.property.height = btn.components.text.property.height;
            btn.components.node.property.x = startX + i * oneWidth + space * i;
            btn.components.node.property.y = btn.components.text.property.height*0.6;
            btn.components.node.update();
        }
    });

}