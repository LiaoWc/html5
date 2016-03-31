window.engine = window.engine || {};
(function () {
    this.system = function (args) {

        //系统名称
        this.name = args.name;
        //系统关联的组件名称
        this.components = {};
        //系统未更新的组件
        this.notUpdatedComponents = {};
        //系统已经更新的组件
        this.updatedComponents = {};
        this.beUpdated = false;

        var onInit = args.onInit;
        var onAdd = args.onAdd;
        var onUpdate = args.onUpdate;
        var onRemove = args.onRemove;
        var onLoop = args.onLoop;

        this.onAdd = function (args) {
            var aComponent = args.component;
            var tId = aComponent.entity.id;
            this.components[tId] = aComponent;
            this.notUpdatedComponents[tId] = true;
            this.beUpdated = true;
            if (onAdd) {
                onAdd.call(this, args);
            }
        };
        this.onRemove = function (args) {
            var id = args.component.entity.id;
            console.log("remove",id,this.name)
            delete this.components[id];
            delete this.notUpdatedComponents[id];
            delete this.updatedComponents[id];

            this.beUpdated = true;
            if (onRemove) {
                onRemove.call(this, args);
            }
        };

        this.onUpdate = function (args) {
            var aComponent = args.component;
            if (aComponent.entity) {
                var tId = aComponent.entity.id;
                this.notUpdatedComponents[tId] = true;
                this.beUpdated = true;
            }
            if (onUpdate) {
                onUpdate.call(this, args);
            }
        };
        this.onLoop = function (tDelta) {
            //移交任务
            for (var i in this.updatedComponents) {
                delete this.updatedComponents[i];
            }
            for (var i in this.notUpdatedComponents) {
                this.updatedComponents[i] = true;
            }
            this.notUpdatedComponents = {};


            if (onLoop) {
                onLoop.call(this, tDelta);
            }
            this.beUpdated = false;
        };

        if (onInit) {
            onInit.call(this);
        }
    };
}).call(engine);