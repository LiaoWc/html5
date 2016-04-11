/**
 * Created by wells on 15/6/23.
 */
game_view_2 = function () {
    var self;
    //var display_type = "landscape";
    var factor_w, factor_h;
    var draw = {};


    var pos_list = [
        {x: 3, y: 5}
    ];

    var food_list = [
        game_image.food_1_png,
        game_image.food_2_png,
        game_image.food_3_png,
        game_image.food_4_png
    ];
    var milk_list = [
        game_image.milk_1_png,
        game_image.milk_2_png,
        game_image.milk_3_png,
        game_image.milk_4_png
    ];
    var get_pos = function () {
        while (true) {
            var x = Math.floor(Math.random() * 7)
            var y = Math.floor(Math.random() * 10)
            var t = true;
            for (var i in pos_list) {
                if (pos_list[i].x == x && pos_list[i].y == y) {
                    t = false;
                    break;
                }
            }
            if (t == true) {
                var pos = {x: x, y: y};
                pos_list.push(pos);
                return pos;
            }
        }
    }
    var clean_pos = function (pos) {
        for (var i in pos_list) {
            if (pos_list[i].x == pos.x && pos_list[i].y == pos.y) {
                delete pos_list[i];
                break;
            }
        }
    }

    function auto_scale(spr, w, h) {
        if (window.orientation) {
            if (window.orientation % 180 == 0) {
                var scale_x = w * cc.winSize.width / spr.getContentSize().width;
                var scale_y = h * cc.winSize.height / spr.getContentSize().height;
                var scale = Math.min(scale_x, scale_y);
                spr.scale = scale;
            } else {
                var scale_x = h * cc.winSize.width / spr.height;
                var scale_y = w * cc.winSize.height / spr.width;
                var scale = Math.min(scale_x, scale_y);
                spr.scale = scale;
            }
        } else {
            var scale_x = w * cc.winSize.width / spr.getContentSize().width;
            var scale_y = h * cc.winSize.height / spr.getContentSize().height;
            var scale = Math.min(scale_x, scale_y);
            spr.scale = scale;
        }
    }

    function auto_pos(spr, x, y) {

        switch (window.orientation) {
            case 0:
                spr.x = x * cc.winSize.width
                spr.y = y * cc.winSize.height
                break;
            case 90:
                spr.x = y * cc.winSize.width
                spr.y = x * cc.winSize.height
                break;
            case -90:
                spr.x = y * cc.winSize.width
                spr.y = x * cc.winSize.height
                break;
            case 180:
                spr.x = x * cc.winSize.width
                spr.y = y * cc.winSize.height
                break;
            default :
                spr.x = x * cc.winSize.width
                spr.y = y * cc.winSize.height
                break;
        }

    }

    function auto_rotation(spr, rotation) {
        switch (window.orientation) {
            case 0:
                spr.rotation = rotation;
                //self.setContentSize(cc.winSize.height,cc.winSize.width);
                break;
            case 90:
                spr.rotation = -90 + rotation;
                break;
            case -90:
                spr.rotation = -90 + rotation;
                break;
            case 180:
                spr.rotation = rotation;
                //self.setContentSize(cc.winSize.height,cc.winSize.width);
                break;
            default :
                spr.rotation = rotation;
                break;
        }
    }

    var l = cc.Layer.extend({
        ctor: function () {
            self = this;
            this._super();
            return true;
        },
        onEnter: function () {
            this._super();
            var mask = new cc.Sprite(game_image.bg_png);
            mask.x = cc.winSize.width / 2;
            mask.y = cc.winSize.height / 2;
            mask.opacity = 0;
            game_sys_notification.init();
            game_data.init();
            game_sys_notification.listen("restart", function (evt) {
                //var view = cc.director.getRunningScene().getChildByName("view_2")
                //if(view){
                //    view.removeFromParent();
                //}else{
                //   var view1 =
                //}
                game_view_1();
            })
            mask.runAction(
                cc.sequence(
                    cc.fadeTo(0.3, 255),
                    cc.callFunc(function () {

                        var view = cc.director.getRunningScene().getChildByName("view_end");
                        if (view) {
                            view.removeFromParentAndCleanup();
                        }
                        var view = cc.director.getRunningScene().getChildByName("view_1");
                        if (view) {
                            view.removeFromParentAndCleanup();
                        }
                        self.init();
                        self.scheduleUpdate();
                        self.update(0);
                    }),
                    cc.delayTime(0.2),
                    cc.fadeTo(0.3, 0),
                    cc.callFunc(function () {
                        mask.removeFromParentAndCleanup();

                    })
                )
            )
            this.addChild(mask, 10);
        },
        init: function () {
            //window.orientation = 0;


            var spr = this.bg = new cc.Sprite(game_image.bg_png);
            this.addChild(spr);


            var spr = this.maze = new cc.Sprite(game_image.maze_png);
            this.addChild(spr);


            var maze = this.maze;
            var spr = this.time = new cc.Sprite(game_image.time_png);
            spr.x = maze.width - spr.width / 2 - 10;
            spr.y = maze.height + spr.height / 2 - 10;
            maze.addChild(spr);


            var spr = this.score = new cc.Sprite(game_image.score_png);
            spr.x = spr.width / 2 - 10;
            spr.y = maze.height + 55;
            maze.addChild(spr);


            var spr = this.bg;
            var scale_x = cc.winSize.width / spr.width;
            var scale_y = cc.winSize.height / spr.height;
            var scale = Math.max(scale_x, scale_y);
            spr.scale = scale;
            auto_pos(spr, 0.5, 0.5)
            auto_rotation(spr, 0)


            var spr = this.maze;
            auto_scale(spr, 0.89, 0.72)
            auto_pos(spr, 0.5, 0.47)
            auto_rotation(spr, 0)

            //logo
            var spr = new cc.Sprite(game_image.logo_png);
            spr.scale = maze.scale;
            spr.setPosition(maze.convertToWorldSpace(cc.p(maze.width - 120, -15)));
            this.addChild(spr, 2);


            //var label_1 = new cc.LabelTTF("ud1","",50)
            // label_1.setAnchorPoint(cc.p(0,1))
            // this.addChild(label_1, 2);
            // label_1.y = cc.winSize.height;
            // //label.x = cc.winSize.width
            // game_sys_notification.listen("ud1",function (evt){
            //     var data = evt.getUserData()
            //     label_1.setString(data+"");
            // })
            //
            //
            // var label_2 = new cc.LabelTTF("ud2","",50)
            // label_2.setAnchorPoint(cc.p(0,1))
            // this.addChild(label_2, 2);
            // label_2.y = cc.winSize.height - 50;
            // //label.x = cc.winSize.width
            // game_sys_notification.listen("ud2",function (evt){
            //     var data = evt.getUserData()
            //     label_2.setString(data+"");
            // })

            //创建地图
            //创建物品
            //创建球

            this.create_maze();
            this.create_time_label();
            this.create_score_label();
            this.create_ball();
            for (var i = 0; i < 6; i++) {
                this.create_duck(i);
            }
            for (var i = 0; i < 2; i++) {
                this.create_milk(i);
            }

            //game_sys_notification.listen("start",function )

        },
        create_time_label: function () {

            var label = new cc.LabelBMFont("40", game_fnt.time_fnt)
            var time_spr = this.time;
            time_spr.addChild(label);
            label.x = time_spr.width / 2;
            label.y = time_spr.height * 0.3;
            var time = 40;
            game_sys_notification.listen("time", function (evt) {
                var dt = evt.getUserData();
                time -= dt;
                if (time <= 0) {
                    time = 0;
                    self.unscheduleUpdate();
                    game_view_end();
                }
                label.setString(Math.ceil(time));
            });
            game_sys_notification.listen("milk", function (evt) {
                time += 5;
            })
        },
        create_score_label: function () {
            var label = new cc.LabelBMFont("0", game_fnt.score_fnt)
            var time_spr = this.score;
            time_spr.addChild(label);
            label.x = time_spr.width * 0.63;
            label.y = time_spr.height * 0.45;
            var score = 0;
            game_sys_notification.listen("score", function () {

                score += Math.ceil(Math.random() * (game_data.food_max - game_data.food_min) + game_data.food_min);
                game_data.score = score;
                label.setString(score);
            })
        },
        create_maze: function () {
            var gsb = game_sys_box2d;
            gsb.create_world();

            //gsb.set_debug_node(this);
            var body_def = gsb.create_body_def();
            body_def.type = gsb.get_static_type();


            var fix_def = gsb.create_fix_def();
            fix_def.density = 1;
            fix_def.friction = 0.5;
            fix_def.restitution = 0.2;


            var size = {width: 7, height: 10};
            factor_w = 74 * this.maze.scale;
            factor_h = 78 * this.maze.scale;


            draw.x = (cc.winSize.width - size.width * factor_w) / 2
            draw.y = (cc.winSize.height - size.height * factor_h) / 2 - cc.winSize.height * 0.03


            var shu_list = [
                1, 0, 1, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 1, 0, 1,
                1, 0, 1, 1, 1, 1, 1, 1,
                1, 0, 0, 1, 0, 0, 0, 1,
                1, 0, 1, 0, 0, 1, 0, 1,
                1, 0, 0, 1, 1, 0, 0, 1,
                1, 1, 1, 0, 0, 1, 1, 1,
                1, 1, 0, 1, 1, 0, 0, 1,
                1, 0, 1, 1, 0, 1, 0, 1,
                1, 1, 0, 0, 1, 0, 0, 1
            ];


            var heng_list = [
                1, 1, 1, 1, 1, 1, 1,
                1, 0, 1, 0, 1, 0, 1,
                0, 1, 0, 0, 0, 1, 0,
                0, 0, 1, 0, 1, 0, 0,
                1, 0, 1, 0, 1, 0, 1,
                0, 1, 0, 1, 0, 1, 0,
                0, 0, 0, 0, 0, 1, 0,
                1, 0, 1, 0, 1, 0, 0,
                0, 0, 1, 0, 1, 0, 1,
                0, 0, 0, 0, 0, 1, 0,
                1, 1, 1, 1, 1, 1, 1
            ]

            //初始化数据
            for (var i = 0; i < shu_list.length; i++) {
                //console.log(i)
                if (shu_list[i] == 1) {

                    var num_y = Math.floor(i / (size.width + 1));
                    var num_x = Math.floor(i % (size.width + 1));
                    //console.log(num_x, num_y)
                    body_def.position = gsb.create_point(draw.x + (num_x) * factor_w, draw.y + (num_y + 0.5) * factor_h);
                    fix_def.shape = gsb.create_box_shape(15 * this.maze.scale, factor_h);
                    shu_list[i] = gsb.add_object(body_def, fix_def)

                }

            }

            for (var i = 0; i < heng_list.length; i++) {
                //console.log(i)
                if (heng_list[i] == 1) {
                    var num_y = Math.floor(i / (size.width));
                    var num_x = Math.floor(i % (size.width));
                    //console.log(num_x, num_y)
                    body_def.position = gsb.create_point(draw.x + (num_x + 0.5) * factor_w, draw.y + (num_y) * factor_h);
                    fix_def.shape = gsb.create_box_shape(factor_w, 15 * this.maze.scale);
                    heng_list[i] = gsb.add_object(body_def, fix_def)

                }

            }


        },
        create_ball: function () {
            //求
            var gsb = game_sys_box2d;
            var body_def = gsb.create_body_def();
            body_def.type = gsb.get_dynamic_type();
            body_def.linearDamping = 3;


            var fix_def = gsb.create_fix_def();
            fix_def.density = 1;
            fix_def.friction = 0.5;
            fix_def.restitution = 0.2;

            var x = draw.x + factor_w / 2 + 3 * factor_w;
            var y = draw.y + factor_h / 2 + 5 * factor_h;
            body_def.position = gsb.create_point(x, y);
            fix_def.shape = gsb.create_circle_shape(27 * this.maze.scale);
            var body = this.ball_body = gsb.add_object(body_def, fix_def)


            var spr = new cc.Sprite(game_image.ball_png);
            spr.scale = this.maze.scale
            this.addChild(spr)
            var userData = {
                node: spr,
                type: "ball"
            };

            body.SetUserData(userData);

            cc.inputManager.setAccelerometerInterval(1 / 60);
            cc.inputManager.setAccelerometerEnabled(true);
            cc.eventManager.addListener({
                event: cc.EventListener.ACCELERATION,
                callback: function (accelEvent, event) {
                    var body = self.ball_body
                    if (accelEvent.x < 0) {
                        gsb.apply_force(body, Math.rad(-90), 200 * Math.abs(accelEvent.x));
                    } else {
                        gsb.apply_force(body, Math.rad(90), 200 * Math.abs(accelEvent.x));
                    }

                    if (accelEvent.y < 0) {
                        gsb.apply_force(body, Math.rad(180), 200 * Math.abs(accelEvent.y));
                    } else {
                        gsb.apply_force(body, Math.rad(0), 200 * Math.abs(accelEvent.y));
                    }
                }
            }, this);

        },
        create_milk: function (i) {
            var gsb = game_sys_box2d;
            var body_def = gsb.create_body_def();
            body_def.type = gsb.get_static_type();


            var fix_def = gsb.create_fix_def();
            fix_def.density = 1;
            fix_def.friction = 0.5;
            fix_def.restitution = 0.2;
            //牛奶


            var pos = get_pos();
            var x = draw.x + factor_w / 2 + pos.x * factor_w;
            var y = draw.y + factor_h / 2 + pos.y * factor_h;
            body_def.position = gsb.create_point(x, y);
            fix_def.shape = gsb.create_circle_shape(8 * this.maze.scale);
            fix_def.isSensor = true;
            var body = gsb.add_object(body_def, fix_def)


            var spr = new cc.Sprite();
            //console.log(i)
            var random = Math.floor(Math.random() * milk_list.length)
            spr.setTexture(milk_list[random]);
            spr.scale = this.maze.scale
            this.addChild(spr)
            var userData = {
                node: spr,
                type: "milk" + i
            };

            body.SetUserData(userData);

            game_sys_notification.listen("destroy_body", function (evt) {
                console.log("evt", evt.getUserData())

                var data = evt.getUserData()
                var type = data.type
                if (type == "milk" + i) {
                    game_sys_notification.dispatch("milk");
                    spr.stopAllActions();
                    spr.runAction(
                        cc.sequence(
                            cc.moveTo(0.5, self.time.convertToWorldSpace(cc.p(self.time.width / 2, self.time.height * 0.37))),
                            cc.callFunc(function () {
                                spr.runAction(cc.scaleBy(0.5, 3))
                                spr.runAction(
                                    cc.sequence(
                                        cc.fadeOut(0.5),
                                        cc.callFunc(function () {
                                            clean_pos(pos);
                                        })
                                    )
                                )
                            }),
                            cc.delayTime(20),
                            cc.callFunc(function () {
                                var random = Math.floor(Math.random() * milk_list.length)
                                spr.setTexture(milk_list[random]);
                                spr.scale = 0;
                                spr.opacity = 0;
                                spr.stopAllActions();
                                spr.runAction(cc.scaleTo(0.5, self.maze.scale).easing(cc.easeBackOut()));
                                spr.runAction(cc.fadeIn(0.5));
                                var pos = get_pos();
                                var x = draw.x + factor_w / 2 + pos.x * factor_w;
                                var y = draw.y + factor_h / 2 + pos.y * factor_h;
                                body_def.position = gsb.create_point(x, y);
                                //fix_def.shape = gsb.create_circle_shape(27 * this.maze.scale);
                                //fix_def.isSensor = true;
                                var body = gsb.add_object(body_def, fix_def)
                                body.SetUserData(userData);
                            })
                        )
                    )
                }
            })
        },
        create_duck: function (i) {
            var gsb = game_sys_box2d;
            var body_def = gsb.create_body_def();
            body_def.type = gsb.get_static_type();


            var fix_def = gsb.create_fix_def();
            fix_def.density = 0;
            fix_def.friction = 0;
            fix_def.restitution = 0;
            //牛奶
            body_def.type = gsb.get_static_type();

            var pos = get_pos();
            var x = draw.x + factor_w / 2 + pos.x * factor_w;
            var y = draw.y + factor_h / 2 + pos.y * factor_h;
            body_def.position = gsb.create_point(x, y);
            fix_def.shape = gsb.create_circle_shape(8 * this.maze.scale);
            fix_def.isSensor = true;
            var body = gsb.add_object(body_def, fix_def)


            var spr = new cc.Sprite();

            var random = i % food_list.length;
            spr.setTexture(food_list[random]);
            //spr.scale = this.maze.scale
            spr.scale = 58 / 256 * this.maze.scale;
            this.addChild(spr)
            var userData = {
                node: spr,
                type: "food" + i
            };

            body.SetUserData(userData);

            game_sys_notification.listen("destroy_body", function (evt) {
                //console.log("evt", evt.getUserData())
                var data = evt.getUserData()
                var type = data.type
                if (type == "food" + i) {
                    game_sys_notification.dispatch("score")
                    spr.stopAllActions();
                    spr.runAction(
                        cc.sequence(
                            cc.moveTo(0.5, self.score.convertToWorldSpace(cc.p(self.score.width * 0.63, self.score.height * 0.4))),
                            cc.callFunc(function () {
                                spr.runAction(cc.scaleBy(0.5, 3))
                                spr.runAction(
                                    cc.sequence(
                                        cc.fadeOut(0.5),
                                        cc.callFunc(function () {
                                            clean_pos(pos);
                                        })
                                    )
                                )
                            }),
                            cc.delayTime(0.6),
                            cc.callFunc(function () {
                                //var random = Math.floor(Math.random() * food_list.length)
                                //spr.setTexture(food_list[random]);
                                spr.scale = 0;
                                spr.opacity = 0;
                                spr.stopAllActions();
                                spr.runAction(cc.scaleTo(0.5, 58 / 256 * self.maze.scale).easing(cc.easeBackOut()));
                                spr.runAction(cc.fadeIn(0.5));
                                var pos = get_pos();
                                var x = draw.x + factor_w / 2 + pos.x * factor_w;
                                var y = draw.y + factor_h / 2 + pos.y * factor_h;
                                body_def.position = gsb.create_point(x, y);
                                //fix_def.shape = gsb.create_circle_shape(27 * this.maze.scale);
                                //fix_def.isSensor = true;
                                var body = gsb.add_object(body_def, fix_def)
                                body.SetUserData(userData);
                            })
                        )
                    )
                }
            })
        },
        update: function (dt) {
            game_sys_box2d.update(dt);
            game_sys_notification.dispatch("time", dt);
        },
        onExit: function () {
            this._super();
        }
    })


    var view = cc.director.getRunningScene().getChildByName("view_2")
    if (view == null) {
        view = new l();
        view.setName("view_2");
        cc.director.getRunningScene().addChild(view, 1);
    }
    return view;
}