/**
 * Created by wells on 15/6/6.
 */

function getQueryStringByName(name) {

    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));

    if (result == null || result.length < 1) {

        return "";

    }

    return result[1];

}


window.onload = function () {
    cc.game.onStart = function () {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            cc.view.enableRetina(false);
        } else {
            cc.view.enableRetina(true);
        }

        cc.view._supportsFullScreen = undefined;
        cc.screen.autoFullScreen = function (element, onFullScreenChange) {
            element = element || document.body;
            var touchTarget = cc._canvas || element;
            var theScreen = this;

            function callback() {
                theScreen.requestFullScreen(element, onFullScreenChange);
                touchTarget.removeEventListener(theScreen._touchEvent, callback);
            }

            this.requestFullScreen(element, onFullScreenChange);

        };
        cc.view.adjustViewPort(false);
        // cc.view.resizeWithBrowserSize(false);

        //var ResizeCallback = function () {
        //    switch (window.orientation) {
        //        case 0:
                    cc.view.setDesignResolutionSize(640, 960, cc.ResolutionPolicy.FIXED_WIDTH);
        //            break;
        //        case -90:
        //            cc.view.setDesignResolutionSize(960, 640, cc.ResolutionPolicy.FIXED_HEIGHT);
        //            break;
        //        case 90:
        //            cc.view.setDesignResolutionSize(960, 640, cc.ResolutionPolicy.FIXED_HEIGHT);
        //            break;
        //        case 180:
        //            cc.view.setDesignResolutionSize(640, 960, cc.ResolutionPolicy.FIXED_WIDTH);
        //            break;
        //        default :
        //            cc.view.setDesignResolutionSize(640, 960, cc.ResolutionPolicy.FIXED_WIDTH);
        //            break;
        //    }
        //    game_sys_notification.dispatch("resize")
        //}
        //cc.view.setResizeCallback(ResizeCallback);
        //ResizeCallback();
        game_scene_main();

    }
    cc.game.run("gameCanvas");
}
