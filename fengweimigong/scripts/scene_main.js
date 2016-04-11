game_scene_main = function () {
    var self;
    var s = cc.Scene.extend({
        onEnter: function () {
            this._super()
            self = this;
            return true;
        },
        onEnterTransitionDidFinish: function () {
            this._super();
            // game_view_loading();
            
                window.game_start ();
                game_view_2();
        },
        onExitTransitionDidStart: function () {
            this._super();
            console.log("onExitTransitionDidStart")
        },
        onExit: function () {
            this._super();
            console.log("onExit")
        }
    })
    var preload= [];
    for(var i in game_image){
        preload.push(game_image[i])
    }
    cc.loader.load(preload,
        function (result, count, loadedCount) {
        },
        function () {
            cc.director.runScene(new s());
        });
}