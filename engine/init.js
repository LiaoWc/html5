/**
 * Created by liao on 16/2/7.
 */
window.engine = {};
engine.loader = new (function() {
    this.maxConnections = 5;
    var connections = [];

    this.loaded = 0;
    this.total = 0;
    this.resource = null;
    var connection = function() {
        this.xhr = new XMLHttpRequest();
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
    }
    connection.prototype.loadFile = function(aFile) {
        console.log("load", aFile);
        this.xhr.open("GET", aFile, true);
        console.log(this);
        // this.xhr.setRequestHeader("Content-Type", "image/png");
        var self = this;
        var loader = engine.loader;
        this.xhr.onreadystatechange = function(event) {
            // console.log(xhr.readyState, xhr.status);
            if (self.xhr.readyState == 4 && self.xhr.status == 200) {
                loader.loaded += 1;
                if (loader.loaded + loader.maxConnections < loader.total) {
                    self.loadFile(loader.resource[loader.loaded + loader.maxConnections])
                }
            }
        }
        this.xhr.send();
    }
    for (var i = 0; i < this.maxConnections; ++i) {
        connections.push(new connection());
    }
    this.loadResource = function(aResource) {
        this.resource = aResource;
        this.total = aResource.length;
        for (var i = 0; i < this.total; ++i) {
            if (i == this.maxConnections) {
                break;
            } else {
                connections[i].loadFile(this.resource[i]);
            }
        }
    }
})();
window.addEventListener('load', function() {
    console.log('window.load');
    var base = {
        path: "engine/base",
        type: ".js",
        files: [
            "node",
            "relation",
            "hierarchy",
            "size",
            "anchorPoint",
            "renderer"
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

    var modules = [
        base,
        draw,
        io,
        scheduler
    ];
    var resource = [];
    for (var i = 0, len = modules.length; i < len; ++i) {
        var module = modules[i];
        var path = module.path;
        var type = module.type;
        var files = module.files;
        for (var j = 0, len2 = files.length; j < len2; ++j) {
            resource.push(path + "/" + files[j] + type);
        }
    }
    engine.loader.loadResource(resource);
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
    // var manager = engine.manager;

    // for (var i in engine.registerComponent) {
    //     manager.registerComponent(engine.registerComponent[i]);
    // }

    // engine.registerSystem.sort(function (a, b) {
    //     if (a.priority > b.priority) {
    //         return 1;
    //     }else if(a.priority == b.priority){
    //         return 0
    //     }else{
    //         return -1;
    //     }

    // });
    // for (var i in engine.registerSystem) {
    //     manager.registerSystem(engine.registerSystem[i]);
    // }
    // engine.run();
    // engine.game();


});
