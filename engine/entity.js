window.engine = window.engine || {};
(function() {
    this.entity = function() {

        //实例id
        this.id = null;

        this.removeSelf = function() {
            for (var i in this.components) {
                this.components[i].removeSelf();
            }
            engine.manager.removeEntity(this);
            this.id = null;
            this.tag = null;
        };

        this.tag = null;
        this.setTag = function(aTag) {
            engine.manager.entitySetTag(this, aTag);
        };

        this.components = {};
        this.addComponent = function(aName) {
            var tComponent = engine.manager.newComponent(aName);
            if (tComponent) {
                //确认组件的唯一性
                if (this.components[aName] == null) {
                    //确认组件的依赖项
                    var tNeeds = tComponent.needs;
                    for (var i in tNeeds) {
                        var tName = tNeeds[i];
                        if (this.components[tName] == null) {
                            this.addComponent(tName);
                        }
                    }
                    this.components[aName] = tComponent;
                    engine.manager.entityAddComponent(this, tComponent);
                }
            }
            return tComponent;
        };
        this.removeComponent = function(aComponent) {
            if (aComponent) {
                engine.manager.entityRemoveComponent(this, aComponent);
                delete this.components[aComponent.name];
            }
        };

    };
}).call(engine);