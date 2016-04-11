game_externs = {}
//对象和数组的深拷贝

game_externs.clone = function (sObj) {
    if (typeof sObj !== "object") {
        return sObj;
    }
    var s = {};
    if (sObj.constructor == Array) {
        s = [];
    }
    for (var i in sObj) {
        s[i] = game_externs.clone(sObj[i]);
    }
    return s;

}
game_externs.touch_enable = function (bool) {
    if (bool == true) {
        if (game_externs.touch_enable_layer != null) {
            cc.eventManager.removeListener(game_externs.touch_enable_layer_listener);
            game_externs.touch_enable_layer_listener = null;
            game_externs.touch_enable_layer.removeFromParent(true)
            game_externs.touch_enable_layer = null;
        }
    } else if (bool == false) {
        var layer = new cc.Layer();
        layer.setTag(100);
        cc.director.getRunningScene().addChild(layer, 100)
        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return true
            }
        });
        cc.eventManager.addListener(listener1, layer);
        game_externs.touch_enable_layer_listener = listener1;
    }

}
game_externs.ui_debug = function (node) {
    if(node.debug_label == null){
        node.debug_label = new cc.LabelTTF("","",60)
        node.debug_label.setAnchorPoint(cc.p(0,0))
        node.addChild( node.debug_label);
    }
    var listener1 = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            var target = event.getCurrentTarget();
            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var content_size = target.getContentSize()
            if (cc.rectContainsPoint(cc.rect(0, 0, content_size.width, content_size.height), locationInNode)) {
                return true
            }
            return false;
        },
        onTouchMoved: function (touch, event) {
            var target = event.getCurrentTarget();
            var location = touch.getLocation();
            target.x = Math.ceil(location.x);
            target.y = Math.ceil(location.y);
            target.debug_label.setString((target.x - cc.winSize.width/2)+":"+(target.y - cc.winSize.height/2))
        }
    });
    cc.eventManager.addListener(listener1, node);
}
game_externs.ui_button = function (node, cb) {

    var listener1 = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            var target = event.getCurrentTarget();
            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var content_size = target.getContentSize()
            if (cc.rectContainsPoint(cc.rect(0, 0, content_size.width, content_size.height), locationInNode) && node.touch_enable) {
                node.scale = node.scale * 0.95;
                return true
            }
            return false;
        },
        onTouchEnded: function (touch, event) {
            var target = event.getCurrentTarget();
            node.scale = node.scale / 0.95;
            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var content_size = target.getContentSize()
            if (cc.rectContainsPoint(cc.rect(0, 0, content_size.width, content_size.height), locationInNode)) {
                cb(node);
            }

        }
    });
    cc.eventManager.addListener(listener1, node);
};

game_externs.ui_ccs_img = function (src, cb) {
    var img = new Image();
    img.src = src;
    //img.style.position = "fixed";
    img.onload = function () {
        cb(img)
    }
    //window.document.body.appendChild(img);
    return img;
}

game_externs.ui_html_font = function () {
    var font = document.createElement('font');
    window.document.body.appendChild(font);
    return font;
}

game_externs.ui_down_button = function (node, cb) {

    var listener1 = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            var target = event.getCurrentTarget();
            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var content_size = target.getContentSize()
            if (cc.rectContainsPoint(cc.rect(0, 0, content_size.width, content_size.height), locationInNode)) {
                // node._touchEnable = false;
                node.stopActionByTag(1)
                var action = cc.scaleTo(0.1, 0.95);
                action.setTag(1)
                node.runAction(action);
                return true
            }
            return false;
        },
        onTouchEnded: function (touch, event) {
            var target = event.getCurrentTarget();
            node.stopActionByTag(1)
            var action = cc.scaleTo(0.1, 1);
            action.setTag(1)
            node.runAction(action);
            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var content_size = target.getContentSize()
            if (cc.rectContainsPoint(cc.rect(0, 0, content_size.width, content_size.height), locationInNode)) {
                cb();
            }

        }
    });
    cc.eventManager.addListener(listener1, node);
};


game_externs.ui_scroll_view = function (node) {
    // btn_new._touchEnable = true;
    var listener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            var target = event.getCurrentTarget();
            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var content_size = target.getContentSize()
            if (cc.rectContainsPoint(cc.rect(0, 0, content_size.width, content_size.height), locationInNode)) {
                return true
            }
            return false;
        },
        onTouchMoved: function (touch, event) {
            var target = event.getCurrentTarget();
            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var delta = touch.getDelta();
            target.x += delta.x
            target.y += delta.y

        }
    });
    cc.eventManager.addListener(listener, node);
    return listener;
};

game_externs.calculate_distance = function (args_point_1, args_point_2) {
    var dalta_x = args_point_1.x - args_point_2.x
    var dalta_y = args_point_1.y - args_point_2.y
    return Math.ceil(Math.sqrt(Math.pow(dalta_x, 2) + Math.pow(dalta_y, 2)))
}
var mark_object_array = {};
game_externs.mark_object = function (object, name) {
    if (mark_object_array[name] == null) {
        mark_object_array[name] = object;
    } else {
    }

}
game_externs.find_object = function (name) {
    return mark_object_array[name];
}
game_externs.run_action = function (node , action){
    var children = node.getChildren()
    for(var i in children){
        var child = children[i]
    }
}

Math.deg = function (rad) {
    return rad / Math.PI * 180
}

Math.rad = function (deg) {
    return deg * Math.PI / 180
}