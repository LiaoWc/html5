window.engine = window.engine || {};
(function() {
    this.manager = new (function() {
        //所有创建的实体
        var entitiesWithId = this.entitiesWithId = {};
        var entitiesWithTag = this.entitiesWithTag = {};
        //创建实体数
        var entitiesCount = 0;

        var registerComponents = this.registerComponents = {};
        var registerSystems = this.registerSystems = {};
        var systemWithComponents = {};

        this.newEntity = function() {
            entitiesCount += 1;
            var entity = new engine.entity();
            entity.id = entitiesCount;
            entitiesWithId[entitiesCount] = entity;
            return entity;
        };
        this.removeEntity = function(aEntity) {
            delete entitiesWithId[aEntity.id];
            if (aEntity.tag) {
                delete entitiesWithTag[aEntity.tag];
            }
        };
        this.entitySetTag = function(aEntity, aTag) {
            if (entitiesWithTag[aTag]) {
                console.error("entitiesWithTag", aTag, "exist");
            } else {
                aEntity.tag = aTag;
                entitiesWithTag[aTag] = aEntity;
            }
        };

        this.registerComponent = function(args) {
            var aComponentName = args.name;

            registerComponents[aComponentName] = args;
            systemWithComponents[aComponentName] = [];
            //console.log(registerComponents)
        };
        this.newComponent = function(aName) {
            var tRegisterComponentArgs = registerComponents[aName];
            //console.log(registerComponents,aName)
            if (tRegisterComponentArgs == null) {
                console.log(aName, "RegisterComponentArgs is null");
                return
            }
            var tComponent = new engine.component(tRegisterComponentArgs);
            return tComponent;
        };

        this.registerSystem = function(args) {
            var tSystem = new engine.system(args);
            registerSystems[args.name] = tSystem;
            for (var i in args.systemComponent) {
                var tComponentName = args.systemComponent[i];
                systemWithComponents[tComponentName] = systemWithComponents[tComponentName] || [];
                systemWithComponents[tComponentName].push(args.name);
            }
        };
        //实体添加组件
        this.entityAddComponent = function(aEntity, aComponent) {
            //通知关联的系统添加组件
            aComponent.entity = aEntity;
            var tComponentSystem = systemWithComponents[aComponent.name];
            for (var i in tComponentSystem) {
                var tSystemName = tComponentSystem[i];
                var tSystem = registerSystems[tSystemName];
                tSystem.onAdd(aComponent);
            }
        };
        //实体移除组件
        this.entityRemoveComponent = function(aEntity, aComponent) {
            //通知关联的系统移除组件
            var tComponentSystem = systemWithComponents[aComponent.name];
            for (var i in tComponentSystem) {
                var tSystemName = tComponentSystem[i];
                var tSystem = registerSystems[tSystemName];
                tSystem.onRemove(aComponent);
            }
        };
        //组件更新
        this.componentUpdate = function(aComponent) {
            //通知关联的系统更新组件
            var tComponentSystem = systemWithComponents[aComponent.name];
            for (var i in tComponentSystem) {
                var tSystemName = tComponentSystem[i];
                var tSystem = registerSystems[tSystemName];
                tSystem.onUpdate(aComponent);
            }
        }

        this.removeEntity = function(aEntity) {
            //通知实体的所有组件，实体被移除
            for (var i in aEntity.components) {
                aEntity.components[i].removeSelf();
            }
            aEntity.components = null;
            delete entitiesWithId[aEntity.id];
            if (aEntity.flag) {
                delete entitiesWithTag[aEntity.flag];
            }
        };
        this.removeComponent = function(aComponent) {
            var tComponentSystem = systemWithComponents[aComponent.name];
            for (var i in tComponentSystem) {
                var tSystemName = tComponentSystem[i];
                var tSystem = registerSystems[tSystemName];
                tSystem.onRemove(aComponent);
            }
        }

        this.mainLoop = function(aDelta) {
            for (var i in registerSystems) {
                var tSystem = registerSystems[i];
                tSystem.onLoop(aDelta);
            }
        };
    })();


}).call(engine);