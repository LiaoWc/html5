/**
 * Created by liao on 16/2/7.
 */

window.addEventListener('load', function () {
    window.engine = window.engine || {};
    //获取设备的DPR（每英寸像素密度）
    engine.dpr = window.devicePixelRatio;
    //获取设备的系统信息
    engine.userAgentInfo = navigator.userAgent;
    engine.startTime = new Date().getTime();
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (engine.userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    //获取设备的平台类型（桌面和移动端）
    engine.platform = flag ? "Desktop" : "Mobile";
    console.log('engine.load', engine);

    //var canvas = function () {
    //    var canvas = document.createElement("canvas");
    //    canvas.id = "preloadCanvas";
    //    canvas.style.padding = "0";
    //    canvas.style.margin = "0";
    //    canvas.style.top = "0";
    //    canvas.style.left = "0";
    //    canvas.style.zIndex = 10;
    //    canvas.style.position = "absolute";
    //    var initCanvas = function () {
    //        canvas.style.width = window.innerWidth;
    //        canvas.style.height = window.innerHeight;
    //        canvas.width = window.innerWidth * engine.dpr;
    //        canvas.height = window.innerHeight * engine.dpr;
    //    };
    //    window.addEventListener('resize', initCanvas, false);
    //    initCanvas();
    //
    //    document.body.appendChild(canvas);
    //    return canvas;
    //}();
    var engineScripts = [
        "engine/base/node.js",
        "engine/base/children.js",
        "engine/base/parent.js",
        "engine/base/hierarchy.js",
        "engine/base/render.js",

        "engine/draw/canvas.js",
        "engine/draw/text.js",
        "engine/draw/image.js",
        "engine/draw/rect.js",
        "engine/draw/input.js",
        "engine/draw/domImage.js",

        "engine/io/event.js",
        "engine/io/touch.js",
        "engine/io/mouse.js",

        "engine/scheduler/action.js",
        "engine/scheduler/timer.js",

        "engine/component.js",
        "engine/entity.js",
        "engine/system.js",
        "engine/manager.js",
        "engine/mainLoop.js",
        "engine/extend.js",
    ];
    var loaded = 0;
    for (var i in engineScripts) {
        var script = document.createElement('script');
        var time = new Date().getTime();
        script.src = engineScripts[i] + '?' + time;
        script.onload = function () {
            loaded += 1;
            if (loaded == engineScripts.length) {
                for (var i in engine.registerComponent) {
                    engine.manager.registerComponent(engine.registerComponent[i]);
                }
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
                    engine.manager.registerSystem(engine.registerSystem[i]);
                }
                engine.run();
                app.init();
            }
        }
        document.body.appendChild(script);
    }
    //
    //
    //var modules = [
    //    framework,
    //    base,
    //    draw,
    //    // draw,
    //    io,
    //    scheduler,
    //    // assets,
    //];
    //for (var i = 0, len = modules.length; i < len; ++i) {
    //    var module = modules[i];
    //    var files = module.files;
    //    for (var j = 0, len2 = files.length; j < len2; ++j) {
    //        // resource.push(path + "/" + files[j] + type);
    //        engine.loader.addResource({
    //            filePath: module.path,
    //            fileName: files[j],
    //            fileType: module.type
    //        })
    //    }
    //}
    //engine.loader.load();
    //
    //engine.loader.onProgress = function (args) {
    //    // console.log(args)
    //}
    //engine.loader.onLoaded = function (args) {
    //    //console.log(args.fileName)
    //    if (args.fileType == ".js") {
    //        // var file = args.filePath + "/" + args.fileName + args.fileType;
    //        // var script = document.createElement("script");
    //        // script.src = file;
    //        // document.body.appendChild(script);
    //        eval(args.response)
    //    }
    //}
    //engine.loader.onFinish = function () {
    //    var manager = engine.manager;
    //
    //    for (var i in engine.registerComponent) {
    //        manager.registerComponent(engine.registerComponent[i]);
    //    }
    //    // console.log(engine)
    //    engine.registerSystem.sort(function (a, b) {
    //        if (a.priority > b.priority) {
    //            return 1;
    //        } else if (a.priority == b.priority) {
    //            return 0
    //        } else {
    //            return -1;
    //        }
    //
    //    });
    //    for (var i in engine.registerSystem) {
    //        manager.registerSystem(engine.registerSystem[i]);
    //    }
    //
    //    engine.run();
    //    app.init();
    //}
    //// var media = {
    ////     path: "engine/media",
    ////     type: ".js",
    ////     files: [
    ////         "audio",
    ////         "vedio"
    ////     ]
    //// }
    //// var xhr = new XMLHttpRequest();
    //// xhr.onreadystatechange = function(event) {
    ////     // console.log(xhr.readyState, xhr.status);
    ////     if (xhr.readyState == 4 && xhr.status == 200) {
    ////         console.log("load")
    ////         var img = new Image();
    ////         img.src = xhr.responseURL;
    ////         img.onload = function() {
    ////             console.log("load")
    ////         }
    ////     }
    //// }
    //// xhr.onerror = function(event) {
    ////     consol.log("error", event);
    //// }
    //// xhr.onprogress = function(event) {
    ////     console.log("onprogress", (event.loaded / event.total * 100).toFixed(2));
    //// }
    //// xhr.open("GET", "assets/jwyg1.png", true);
    //// xhr.setRequestHeader("Content-Type", "image/png");
    //// xhr.send();
    //
    //// var filePath = "assets/jwyg1.png"
    //// var fileText = filePath.substring(filePath.lastIndexOf("."), filePath.length);
    //// var fileName = fileText.toLowerCase();
    //// console.log(fileText, fileName);
    //
    //
    //// window.engine = window.engine || {};
    //
    //// engine.run();
    //// engine.game();


});
