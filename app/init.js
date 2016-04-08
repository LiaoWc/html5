window.app = window.app || {};
app.init = function () {
    console.log("game");
    var scripts = {
        path: "app",
        type: ".js",
        files: [
            "main",
            "rootStage",
            "debugView",
            "home",
            "navigationBar",
            "resume",
            "skill",
            "works",
            "bg",
        ]
    }
    var png = {
        path: "assets",
        type: ".png",
        files: [
            "head",
            "qr_shishen",
            "jwyg1",
            "bgTile",
            "qrcode1"
        ]
    };
    var jpg = {
        path: "assets",
        type: ".jpg",
        files: [
            "header-background",
        ]
    };
    var modules = [
        scripts,
        png,
        jpg,
        // draw,
        // io,
        // scheduler,
        // assets,
    ];
    for (var i = 0, len = modules.length; i < len; ++i) {
        var module = modules[i];
        var files = module.files;
        for (var j = 0, len2 = files.length; j < len2; ++j) {
            engine.loader.addResource({
                filePath: module.path,
                fileName: files[j],
                fileType: module.type
            });
        }
    }


    engine.loader.onProgress = function (args) {
        // console.log(args)
    }
    app.resource = {};

    engine.loader.onLoaded = function (args) {
        // console.log(args)
        switch (args.fileType) {
            case ".js":
                //console.log(args.fileName)
                eval(args.response)
                break;
            case ".png":
                var img = new Image();
                img.src = args.filePath + "/" + args.fileName + args.fileType;
                engine.loader.total += 1;
                img.onload = function () {
                    engine.loader.loaded += 1;
                    app.resource[args.filePath + "/" + args.fileName + args.fileType] = img;
                    if (engine.loader.loaded == engine.loader.total) {
                        engine.loader.queue = [];
                        engine.loader.onFinish();
                    }
                }
                break;
            case ".jpg":
                var img = new Image();
                img.src = args.filePath + "/" + args.fileName + args.fileType;
                engine.loader.total += 1;
                img.onload = function () {
                    engine.loader.loaded += 1;
                    app.resource[args.filePath + "/" + args.fileName + args.fileType] = img;
                    if (engine.loader.loaded == engine.loader.total) {
                        engine.loader.queue = [];
                        engine.loader.onFinish();
                    }
                };
                break;
        }
    }
    engine.loader.onFinish = function () {
        app.rootStage()

    }

    engine.loader.load();
}