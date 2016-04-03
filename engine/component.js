window.engine = window.engine || {};
(function () {
    this.component = function (args) {
        //组件所属实体
        this.name = args.name;
        this.needs = args.needs;
        this.entity = null;
        //组件属性
        this.property = {};
        for (var i in args.property) {
            var tProperty = args.property[i];
            this.property[tProperty.key] = tProperty.value;
        }
        this.update = function () {
            engine.manager.componentUpdate(this);
        };
        this.removeSelf = function () {
            this.entity.removeComponent(this);
        }
    };
}).call(engine);