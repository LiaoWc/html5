window.app = window.app || {};
app.loadingLayer = function () {
    console.log("app.loadingLayer")
    var rootScene = engine.manager.entitiesWithTag["rootScene"];
    var sysEvent = engine.manager.registerSystems.event;
    var root = function () {
        var entity = engine.manager.newEntity();
        entity.setTag("loadingLayer");
        //entity.enabled = false;

        var cNode = entity.addComponent("node");
        cNode.property.anchorPointX = 0.5;
        cNode.property.anchorPointY = 0.5;
        cNode.property.alpha = 0;
        entity.addComponent("children");
        var cRect = entity.addComponent("rect");
        cRect.property.fillColor = "#000";
        cRect.update();

        engine.manager.registerSystems.children.addChild(rootScene, entity);

        var init = function () {
            cNode.property.x = rootScene.components.node.property.width / 2;
            cNode.property.y = rootScene.components.node.property.height / 2;
            cNode.property.width = rootScene.components.node.property.width;
            cNode.property.height = rootScene.components.node.property.height;
            cNode.update();
            cRect.property.width = cNode.property.width;
            cRect.property.height = cNode.property.height;
            cRect.update();
        };
        init();

        var cAction = entity.addComponent("action");
        cAction.property.add = true;
        cAction.property.duration = 500;
        cAction.property.callback = function (args) {
            cNode.property.alpha = args.value;
            cNode.update();
        };
        cAction.update();

        cAction.property.add = true;
        cAction.property.duration = 500;
        cAction.property.callback = function (args) {
            loadingText.components.node.property.alpha = args.value;
            loadingText.components.node.update();
            countText.components.node.property.alpha = args.value;
            countText.components.node.update();
        };
        cAction.update();

        cAction.property.add = true;
        cAction.property.duration = 0;
        cAction.property.callback = function (args) {
            console.log("load")
            load();
        };
        cAction.update();

        cAction.property.run = true;
        cAction.update();

        var event = entity.addComponent("event");
        sysEvent.listen(entity, "rootSceneResize", function (aEvent) {
            init();
            sysEvent.dispatch(entity, "loadingLayerResize", {
                width: cNode.property.width,
                height: cNode.property.height
            })
        });
        return entity;
    }();

    var loadingText = function () {
        var entity = engine.manager.newEntity();
        var cNode = entity.addComponent("node");
        cNode.property.anchorPointX = 0.5;
        cNode.property.anchorPointY = 1;
        cNode.property.alpha = 0;
        entity.addComponent("children");
        var text = entity.addComponent("text");
        text.property.fillText = "Loading";
        text.property.fontColor = "#f8c58f";
        var cTimer = entity.addComponent("timer");
        cTimer.property.interval = 500;
        var times = 1;
        cTimer.property.callback = function () {
            times += 1;
            if (times == 1) {
                text.property.fillText = "Loading";
            } else if (times == 2) {
                text.property.fillText = "Loading.";
            } else if (times == 3) {
                text.property.fillText = "Loading..";
            } else if (times == 4) {
                text.property.fillText = "Loading...";
                times = 0;
            }
            text.update();
        }
        cTimer.update();
        var init = function () {
            var fontSize = Math.min(root.components.node.property.width * 0.15, root.components.node.property.height * 0.05)
            text.property.fontSize = fontSize;
            text.update();
            cNode.property.width = text.property.width;
            cNode.property.height = text.property.height;
            cNode.update();
        }
        init();
        var event = entity.addComponent("event");
        sysEvent.listen(entity, "loadingLayerResize", function (aEvent) {
            init();
        });

        engine.manager.registerSystems.children.addChild(root, entity);
        return entity;
    }();
    var countText = function () {
        var entity = engine.manager.newEntity();
        var cNode = entity.addComponent("node");
        cNode.property.anchorPointX = 0.5;
        cNode.property.anchorPointY = 0;
        cNode.property.alpha = 0;
        //entity.addComponent("children");
        var text = entity.addComponent("text");
        text.property.fillText = "0%";
        text.property.fontColor = "#f8c58f";
        var cTimer = entity.addComponent("timer");
        cTimer.property.interval = 0;
        var now = 0;
        cTimer.property.callback = function () {
            if (now >= 100) {
                now = 100;
                app.resumeLayer();
                cTimer.removeSelf();
            } else {
                if (now < Math.floor(loaded / resource.length * 100)) {
                    now += 1;
                }
                text.property.fillText = now + "%";
                text.update();
                cNode.property.width = text.property.width;
                cNode.property.height = text.property.height;
                cNode.update();
            }
        }
        cTimer.update();
        var init = function () {
            var fontSize = Math.min(root.components.node.property.width * 0.15 * 0.6, root.components.node.property.height * 0.05 * 0.6)
            text.property.fontSize = fontSize;
            text.update();
            cNode.property.width = text.property.width;
            cNode.property.height = text.property.height;
            cNode.update();
        }
        init();
        var event = entity.addComponent("event");
        sysEvent.listen(entity, "loadingLayerResize", function (aEvent) {
            init();
        });

        engine.manager.registerSystems.children.addChild(root, entity);
        return entity;
    }();
    var resource = [
        "app/resumeLayer/main.js",
        "app/resumeLayer/rootStage.js",
        "app/resumeLayer/debugView.js",
        "app/resumeLayer/home.js",
        "app/resumeLayer/about.js",
        "app/resumeLayer/navigationBar.js",
        "app/resumeLayer/resume.js",
        "app/resumeLayer/skill.js",
        "app/resumeLayer/works.js",
        "app/resumeLayer/bgLayer.js",

        "assets/header-background.jpg",
        "assets/head.png",
        "assets/qr1.png",
        "assets/qr2.png",
        "assets/qr3.png",
        "assets/qr4.png",
        "assets/qr5.png",
    ];
    var loaded = 0;
    app.resource = {};

    var load = function () {
        var filePath = resource[loaded];
        var fileType = filePath.substr(filePath.lastIndexOf('.') + 1);
        if (fileType == "js") {
            var script = document.createElement('script');
            script.src = resource[loaded] + '?' + engine.startTime;
            script.onload = function () {
                loadFinish()
            }
            document.body.appendChild(script);
        } else if (fileType == "png" || fileType == "jpg") {
            var img = new Image();
            img.src = filePath + '?' + engine.startTime;
            app.resource[filePath] = img;
            img.onload = function () {
                loadFinish()
            }
        }
    };
    var loadFinish = function () {
        loaded += 1;
        if (loaded == resource.length) {

        } else {
            load();
        }
    }
    //console.log(engine.manager.registerSystems.render.components)
}