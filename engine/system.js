window.engine = window.engine || {};
(function() {
    this.system = function(args) {

        //系统名称
        this.name = args.name;
        //系统关联的组件名称
        this.components = {};
        //系统发生更新的组件
        this.updatedComponents = {};
        //系统是否发生更新
        this.beUpdated = false;

        var onInit = args.onInit;
        var onAdd = args.onAdd;
        var onUpdate = args.onUpdate;
        var onRemove = args.onRemove;
        var onLoop = args.onLoop;
        if (onAdd) {
            this.onAdd = function(aComponent) {
                var id = aComponent.entity.id;
                this.components[id] = aComponent;
                this.updatedComponents[id] = aComponent;
                this.beUpdated = true;
                onAdd.call(this, aComponent);
            };
        } else {
            this.onAdd = function(aComponent) {
                var id = aComponent.entity.id;
                this.components[id] = aComponent;
                this.updatedComponents[id] = aComponent;
                this.beUpdated = true;

            };
        }
        if (onRemove) {
            this.onRemove = function(aComponent) {
                var id = aComponent.entity.id;
                delete this.components[id];
                delete this.updatedComponents[id];
                this.beUpdated = true;
                onRemove.call(this, aComponent);
            };
        } else {
            this.onRemove = function(aComponent) {
                var id = aComponent.entity.id;
                delete this.components[id];
                delete this.updatedComponents[id];
                this.beUpdated = true;
            };
        }

        if (onUpdate) {
            this.onUpdate = function(aComponent) {
                var id = aComponent.entity.id;
                this.beUpdated = true;
                this.updatedComponents[id] = aComponent;
                onUpdate.call(this, aComponent);
            };
        } else {
            this.onUpdate = function(aComponent) {
                var id = aComponent.entity.id;
                this.beUpdated = true;
                this.updatedComponents[id] = aComponent;
            };
        }

        if (onLoop) {
            this.onLoop = function(aDelta) {
                onLoop.call(this, aDelta);
                this.beUpdated = false;
                this.updatedComponents = {};
            };
        } else {
            this.onLoop = function(aDelta) {
                this.beUpdated = false;
                this.updatedComponents = {};
            };
        }


        if (onInit) {
            onInit.call(this);
        }
    };
}).call(engine);