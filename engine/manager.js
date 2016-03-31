window.engine = window.engine || {};
(function () {
    this.manager = new (function () {
        //所有创建的实体
        var entitiesWithId = this.entitiesWithId = {};
        var entitiesWithFLag = this.entitiesWithFLag = {};
        //创建实体数
        var entitiesCount = 0;

        var registerComponents = this.registerComponents = {};
        var systemsWithName = this.systems = {};
        var systemWithComponentName = {};

        this.getEntityByFlag = function (aFlag) {
            return entitiesWithFLag[aFlag]
        }

        this.newEntity = function () {
            entitiesCount += 1;
            var tEntity = new engine.entity();
            tEntity.setId(entitiesCount);
            entitiesWithId[entitiesCount] = tEntity;
            return tEntity;
        };
        this.removeEntity = function (aEntity) {
            delete entitiesWithId[aEntity.id];
            if (aEntity.flag) {
                delete entitiesWithFLag[aEntity.flag];
            }
        };
        this.getEntityById = function (aId) {
            return entitiesWithId[aId];
        };
        this.getEntityByFlag = function (aFlag) {
            return entitiesWithId[aFlag];
        };
        this.entitySetFlag = function (aEntity, aFlag) {
            entitiesWithFLag[aFlag] = aEntity;
        };

        this.registerComponent = function (args) {
            var aComponentName = args.name;
            registerComponents[aComponentName] = args;
            systemWithComponentName[aComponentName] = [];
        };
        this.newComponent = function (aName) {
            var tRegisterComponentArgs = registerComponents[aName];
            if (tRegisterComponentArgs == null) {
                console.log(aName, "RegisterComponentArgs is null");
                return
            }
            var tComponent = new engine.component(tRegisterComponentArgs);
            return tComponent;
        };
        this.registerSystem = function (args) {
            var tSystem = new engine.system(args);
            systemsWithName[args.name] = tSystem;
            for (var i in args.systemComponent) {
                var tComponentName = args.systemComponent[i];
                systemWithComponentName[tComponentName] = systemWithComponentName[tComponentName] || [];
                systemWithComponentName[tComponentName].push(args.name);
            }
        };
        this.getSystem = function (aName) {
           return systemsWithName[aName];
        }
        //实体添加组件
        this.entityAddComponent = function (aEntity, aComponent) {
            //通知关联的系统添加组件
            aComponent.entity = aEntity;
            var tComponentSystem = systemWithComponentName[aComponent.name];
            for (var i in tComponentSystem) {
                var tSystemName = tComponentSystem[i];
                var tSystem = systemsWithName[tSystemName];

                tSystem.onAdd({
                    component: aComponent
                });
            }
        };
        this.entityRemoveComponent = function (aEntity, aComponent) {
            //通知关联的系统移除组件
            var tComponentSystem = systemWithComponentName[aComponent.name];
            for (var i in tComponentSystem) {
                var tSystemName = tComponentSystem[i];
                var tSystem = systemsWithName[tSystemName];
                tSystem.onRemove({
                    component: aComponent
                });
            }
        };
        //组件更新属性
        this.componentUpdate = function (args) {
            var tComponentSystem = systemWithComponentName[args.component.name];
            for (var i in tComponentSystem) {
                var tSystemName = tComponentSystem[i];
                var tSystem = systemsWithName[tSystemName];
                tSystem.onUpdate(args);
            }
        }

        this.removeEntity = function (aEntity) {
            //通知实体的所有组件，实体被移除
            for (var i in aEntity.components) {
                aEntity.components[i].removeSelf();
            }
            aEntity.components = null;
            delete entitiesWithId[aEntity.id];
            if (aEntity.flag) {
                delete entitiesWithFLag[aEntity.flag];
            }
        };
        this.removeComponent = function (args) {
            var tComponentSystem = systemWithComponentName[args.component.name];
            for (var i in tComponentSystem) {
                var tSystemName = tComponentSystem[i];
                var tSystem = systemsWithName[tSystemName];
                tSystem.onRemove(args);
            }
        }

        this.mainLoop = function (aDelta) {
            for (var i in systemsWithName) {
                var tSystem = systemsWithName[i];
                tSystem.onLoop(aDelta);
            }
        };
    })();


}).call(engine);