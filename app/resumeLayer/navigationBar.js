window.app = window.app || {};
app.navigationBar = function () {
    console.log("app.navigationBar")
    var rootScene = engine.manager.entitiesWithTag["rootScene"];
    var sysEvent = engine.manager.registerSystems.event;
    var root = function () {
        var entity = engine.manager.newEntity();
        entity.setTag("navigationBar");
        var node = entity.addComponent("node");
        //node.property.alpha = 0.5;
        //node.update();
        entity.addComponent("children");
        //var rect = entity.addComponent("rect");
        //rect.property.fillColor = "#fff";
        //rect.property.width = 200;
        //rect.property.height = 25;
        //rect.update();
        engine.manager.registerSystems.children.addChild(rootScene, entity);
        var event = entity.addComponent("event");
        sysEvent.listen(entity, "rootSceneResize", function (aEvent) {

            node.property.y = aEvent.height * 0.02;
            node.property.width = aEvent.width;
            node.property.height = aEvent.height * 0.05;
            node.update();

            //rect.property.width = node.property.width;
            //rect.property.height = node.property.height;
            //rect.update();

            //sysEvent.dispatch(entity, "rootResize", {
            //    width: node.property.width,
            //    height: node.property.height
            //})

        });

        node.property.alpha = 0;
        node.update();


        var action = entity.addComponent("action");

        action.property.add = true;
        action.property.duration = 1000;
        action.update();

        action.property.add = true;
        action.property.duration = 1000;
        action.property.callback = function (args) {
            node.property.alpha = args.value;
            node.update();
        };
        action.update();


        action.property.add = true;
        action.property.duration = 1000;
        action.property.callback = function (args) {

        };
        action.update();
        action.property.run = true;
        action.update();
        //var action = entity.addComponent("action");
        //action.property.add = true;
        //action.property.duration = 1000;
        //action.property.callback = function (args) {
        //    node.property.alpha = args.value;
        //    node.update();
        //};
        //action.property.run = true;
        //action.update();

        return entity;
    }();

    var btnsProperty = [
        {name: "主页"},
        {name: "个人"},
        {name: "经历"},
        {name: "技能"},
        {name: "作品"},
    ];
    var btns = [];
    var entityTag = "";
    var lastId = -1;

    var creator = function (args) {
        var entity = engine.manager.newEntity();
        var node = entity.addComponent("node");
        node.property.anchorPointX = 0.5;
        node.property.anchorPointY = 0.5;
        node.property.alpha = 0.5;
        var text = entity.addComponent("text");
        text.property.fillText = args.name;
        text.property.fontWeight = "bold";
        text.update();
        engine.manager.registerSystems.children.addChild(root, entity);

        var touch = entity.addComponent("touch");
        touch.property.callback = function (touchEvent) {

            switch (touchEvent.state) {
                case "onTouchBegan":
                    console.log(args.name)
                    switch (args.name) {
                        case "主页":
                            choose(0);
                            break;
                        case "个人":
                            choose(1);
                            break;
                        case "经历":
                            choose(2);
                            break;
                        case "技能":
                            choose(3);
                            break;
                        case "作品":
                            choose(4);
                            break;
                    }
                    return true;
                    break;
            }
        }

        var event = entity.addComponent("event");
        sysEvent.listen(entity, "rootSceneResize", function (aEvent) {
            var space = root.components.node.property.width / 4 * 0.8;
            var fontSize = Math.min(root.components.node.property.height * 0.7, root.components.node.property.width * 0.05)
            text.property.fontSize = fontSize;
            text.update();
            node.property.width = text.property.width;
            node.property.height = text.property.height;
            node.property.x = space * args.id + root.components.node.property.width * 0.1;
            node.property.y = root.components.node.property.height / 2;
            node.update();
            touch.property.width = node.property.width;
            touch.property.height = node.property.height;
            touch.update();
        });

        btns.push(entity);
    }
    for (var i in btnsProperty) {
        var args = btnsProperty[i];
        args.id = i;
        creator(args);
    }
    var choose = function (id) {
        var lastEntity = engine.manager.entitiesWithTag[entityTag];
        if (lastEntity) {
            lastEntity.enabled = false;
            if(entityTag == "works"){
                sysEvent.dispatch(engine.manager.entitiesWithTag[entityTag], "worksEnabled",{})
            }
        }
        switch (id) {
            case 0:
                entityTag = "home";
                break;
            case 1:
                entityTag = "about";
                break;
            case 2:
                entityTag = "resume";
                break;
            case 3:
                entityTag = "skill";
                break;
            case 4:
                entityTag = "works";

                break;

        }
        //console.log(entityTag)
        engine.manager.entitiesWithTag[entityTag].enabled = true;
        if(entityTag == "works"){
            sysEvent.dispatch(engine.manager.entitiesWithTag[entityTag], "worksEnabled",{})
        }
        if (lastId >= 0) {
            var lastBtn = btns[lastId];
            var node = lastBtn.components.node;
            var text = lastBtn.components.text;
            node.property.alpha = 0.5;
            node.property.scaleX = 1;
            node.property.scaleY = 1;
            node.update();
            text.property.fontColor = "#fff";
            text.update();
        }

        var btn = btns[id];
        var node = btn.components.node;
        var text = btn.components.text;
        node.property.alpha = 1;
        node.property.scaleX = 1.1;
        node.property.scaleY = 1.1;
        node.update();
        text.property.fontColor = "#ed9121";
        text.update();
        lastId = id;
        //switch()
    };
    choose(0);
}