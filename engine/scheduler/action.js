window.engine = window.engine || {};
(function () {
    //t: current time（当前时间）；
    //b: beginning value（初始值）；
    //c: change in value（变化量）；
    //d: duration（持续时间）。
    var Tween = {
        Linear: function (t, b, c, d) {
            return c * t / d + b;
        },
        QuadIn: function (t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        QuadOut: function (t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        QuadInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        },
        CubicIn: function (t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        CubicOut: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        CubicInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        },
        QuartIn: function (t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        QuartOut: function (t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        QuartInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        },
        QuintIn: function (t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        QuintOut: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        QuintInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        },
        SineIn: function (t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        SineOut: function (t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        SineInOut: function (t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        },
        ExpoIn: function (t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        ExpoOut: function (t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        ExpoInOut: function (t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        CircIn: function (t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        CircOut: function (t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        CircInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        },
        ElasticIn: function (t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        ElasticOut: function (t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
        },
        ElasticInOut: function (t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (!p) p = d * (.3 * 1.5);
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        },
        BackIn: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        BackOut: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        BackInOut: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        },
        BounceIn: function (t, b, c, d) {
            return c - Tween.BounceOut(d - t, 0, c, d) + b;
        },
        BounceOut: function (t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        BounceInOut: function (t, b, c, d) {
            if (t < d / 2) return Tween.BounceIn(t * 2, 0, c, d) * .5 + b;
            else return Tween.BounceOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    };
    engine.registerComponent = engine.registerComponent || [];
    this.registerComponent.push({
        name: "action",
        property: [
            {key: 'add', value: false},//添加动作
            {key: 'remove', value: false},//删除动作
            {key: 'group', value: 0},//动作组别
            {key: 'duration', value: 0},//持续时间，单位（ms）
            {key: 'value', value: 0},//变化量
            {key: 'easeType', value: "Linear"},//缓动效果，默认linear，常用sineInOut，backInOut
            {key: 'callback', value: null},//回调
            //{key: 'delay', value: 0},
            //{key: 'callback', value: null},
            {key: 'run', value: false},//开始
            {key: 'loop', value: false},//循环
            //{key: 'time', value: false},//运行时间
            //{key: 'scale', value: 1},//时间缩放比例
            {key: 'pause', value: false},//暂停
            {key: 'finish', value: false},//完成
            {key: 'queue', value: null},//动作队列
            {key: 'runQueue', value: null},//运行队列
        ]
    });
    var action = function (value, duration, callback) {
        this.used = 0;
        this.finish = false;
        if (callback) {
            this.update = function (aDelta) {
                var time = this.used + aDelta;
                if (time >= duration) {
                    this.used = duration;
                    time -= duration;
                    this.finish = true;
                } else {
                    this.used += aDelta;
                    time = 0;
                }
                var v = Tween.Linear(this.used, 0, 1, duration);
                callback({
                    value: v
                });
                return time;
            }
        }
        else {
            this.update = function (aDelta) {
                var time = this.used + aDelta;
                if (time > duration) {
                    this.used = duration;
                    time -= duration;
                } else {
                    this.used += aDelta;
                    time = 0;
                }
                return time;
            }
        }
    };
    engine.registerSystem = engine.registerSystem || [];
    this.registerSystem.push({
        name: "action",
        priority: 10,
        systemComponent: ["action"],
        onInit: function () {
            //拥有node的实体

        },
        onAdd: function (aComponent) {
            aComponent.property.queue = {};
            aComponent.property.runQueue = {};
        },
        //onRemove: function (args) {
        //    //组件移除时触发
        //},
        onUpdate: function (aComponent) {
            var property = aComponent.property;
            if (property.add == true) {
                //添加动作
                var act = new action(property.value, property.duration, property.callback);
                if (property.queue[property.group] == null) {
                    property.queue[property.group] = [];
                }
                //console.log(aComponent.entity.id, "add", property.queue);
                property.queue[property.group].push(act);
                property.group = 0;
                property.add = false;
            }
            if (property.run == true) {
                for (var i in property.queue) {
                    property.runQueue[i] = property.queue[i];
                }
            }
        },
        onLoop: function (aDelta) {
            for (var i in this.components) {
                var com = this.components[i];
                if (com.property.run == true && com.property.pause == false) {
                    for (var j in com.property.runQueue) {
                        var group = com.property.runQueue[j];
                        //console.log(com.entity.id,group);
                        var time = aDelta;
                        var removeCount = 0;
                        for (var k = 0, len = group.length; k < len; ++k) {
                            var act = group[k];
                            var time = act.update(time);
                            if (act.finish) {
                                removeCount += 1;
                            }
                            if (time == 0) {
                                break;
                            }
                        }
                        for (var n = 0; n < removeCount; ++n) {
                            group.shift();
                        }
                        if (group.length == 0) {
                            delete com.property.runQueue[j];
                        }
                    }
                }
            }
        }
    });
}).
    call(engine);