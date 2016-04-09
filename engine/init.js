/**
 * Created by liao on 16/2/7.
 */

window.addEventListener('load', function () {
    engine.dpr = window.devicePixelRatio;
    function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }
    engine.platform = IsPC() ? "Desktop" : "Mobile";
    console.log('window.load');
    var base = {
        path: "engine/base",
        type: ".js",
        files: [
            "node",
            "children",
            "parent",
            "hierarchy",
            "render"
        ]
    }
    var draw = {
        path: "engine/draw",
        type: ".js",
        files: [
            "canvas",
            "text",
            "image",
            "rect",
            "input"
        ]
    }
    var io = {
        path: "engine/io",
        type: ".js",
        files: [
            "event",
            "touch",
            "mouse"
        ]
    }
    var scheduler = {
        path: "engine/scheduler",
        type: ".js",
        files: [
            "action",
            // "animation",
            // "timer"
        ]
    }


    var framework = {
        path: "engine",
        type: ".js",
        files: [
            "component",
            "entity",
            "system",
            "manager",
            "mainLoop",
            // "animation",
            // "timer"
        ]
    }


    var modules = [
        framework,
        base,
        draw
        // draw,
        // io,
        // scheduler,
        // assets,
    ];
    for (var i = 0, len = modules.length; i < len; ++i) {
        var module = modules[i];
        var files = module.files;
        for (var j = 0, len2 = files.length; j < len2; ++j) {
            // resource.push(path + "/" + files[j] + type);
            engine.loader.addResource({
                filePath: module.path,
                fileName: files[j],
                fileType: module.type
            })
        }
    }
    engine.loader.load();

    engine.loader.onProgress = function (args) {
        // console.log(args)
    }
    engine.loader.onLoaded = function (args) {
        //console.log(args.fileName)
        if (args.fileType == ".js") {
            // var file = args.filePath + "/" + args.fileName + args.fileType;
            // var script = document.createElement("script");
            // script.src = file;
            // document.body.appendChild(script);
            eval(args.response)
        }
    }
    engine.loader.onFinish = function () {
        var manager = engine.manager;

        for (var i in engine.registerComponent) {
            manager.registerComponent(engine.registerComponent[i]);
        }
        // console.log(engine)
        engine.registerSystem.sort(function (a, b) {
            if (a.priority > b.priority) {
                return 1;
            } else if (a.priority == b.priority) {
                return 0
            } else {
                return -1;
            }

        });
        for (var i in engine.registerSystem) {
            manager.registerSystem(engine.registerSystem[i]);
        }

        engine.run();
        app.init();
    }
    // var media = {
    //     path: "engine/media",
    //     type: ".js",
    //     files: [
    //         "audio",
    //         "vedio"
    //     ]
    // }
    // var xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = function(event) {
    //     // console.log(xhr.readyState, xhr.status);
    //     if (xhr.readyState == 4 && xhr.status == 200) {
    //         console.log("load")
    //         var img = new Image();
    //         img.src = xhr.responseURL;
    //         img.onload = function() {
    //             console.log("load")
    //         }
    //     }
    // }
    // xhr.onerror = function(event) {
    //     consol.log("error", event);
    // }
    // xhr.onprogress = function(event) {
    //     console.log("onprogress", (event.loaded / event.total * 100).toFixed(2));
    // }
    // xhr.open("GET", "assets/jwyg1.png", true);
    // xhr.setRequestHeader("Content-Type", "image/png");
    // xhr.send();

    // var filePath = "assets/jwyg1.png"
    // var fileText = filePath.substring(filePath.lastIndexOf("."), filePath.length);
    // var fileName = fileText.toLowerCase();
    // console.log(fileText, fileName);


    // window.engine = window.engine || {};

    // engine.run();
    // engine.game();


});
