window.engine = window.engine || {};

engine.loader = new (function () {
    this.onProgress = null;
    this.onLoaded = null;
    this.onFinish = null;
    this.loaded = 0;
    this.total = 0;
    this.queue = [];
    this.resource = {};

    this.maxConnections = 5;
    var connections = [];
    var timestamp = new Date().getTime();
    var connection = function () {
        this.xhr = new XMLHttpRequest();
    }
    connection.prototype.loadFile = function (aResource) {
        if (aResource == null) {
            return
        }
        this.xhr.open("GET", aResource.filePath + "/" + aResource.fileName + aResource.fileType + "?" + timestamp, true);
        var self = this;
        var loader = engine.loader;
        this.xhr.onreadystatechange = function (event) {
            // console.log(xhr.readyState, xhr.status);
            if (self.xhr.readyState == 4 && self.xhr.status == 200) {
                loader.loaded += 1;
                loader.onLoaded({
                    filePath: aResource.filePath,
                    fileName: aResource.fileName,
                    fileType: aResource.fileType,
                    response: self.xhr.response
                })
                var number = loader.loaded + loader.maxConnections - 1;
                if (number < loader.total) {
                    self.loadFile(loader.queue[number])
                }
                if (loader.loaded == loader.total) {
                    loader.queue = [];
                    loader.onFinish();
                }
            }
        }
        this.xhr.onprogress = function (event) {
            if (self.xhr.status == 200) {
                loader.onProgress({
                    filePath: aResource.filePath,
                    fileName: aResource.fileName,
                    fileType: aResource.fileType,
                    loaded: event.loaded,
                    total: event.total
                })
            }
        }
        this.xhr.send();
    }
    for (var i = 0; i < this.maxConnections; ++i) {
        connections.push(new connection());
    }
    this.addResource = function (aResource) {
        if (this.resource[aResource.filePath + "/" + aResource.fileName + aResource.fileType] == null) {
            this.queue.push(aResource);
        }
    }
    this.load = function () {
        this.total = this.queue.length;
        this.loaded = 0;
        for (var i = 0; i < this.total; ++i) {
            if (i == this.maxConnections) {
                break;
            } else {
                connections[i].loadFile(this.queue[i]);
            }
        }
    }
})();