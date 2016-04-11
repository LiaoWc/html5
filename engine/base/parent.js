window.engine = window.engine || {};
(function () {
    engine.registerComponent = engine.registerComponent || [];
    this.registerComponent.push({
        name: "parent",
        needs: ["node"],
        property: [
            {key: 'entity', value: null},
        ]
    });
    engine.registerSystem = engine.registerSystem || [];
    this.registerSystem.push({
        name: "parent",
        priority: 3,
        systemComponent: ["parent"],
        //onInit: function () {
        //    //拥有node的实体
        //},
        //onAdd: function (args) {
        //},
        onRemove: function (aComponent) {
            //组件移除时触发
            for(var i in aComponent.property.entity.components.children.property.entities){
                if(aComponent.property.entity.components.children.property.entities[i] == aComponent.entity){
                    aComponent.property.entity.components.children.property.entities.splice(i,1);
                }
            }
        },
        //onUpdate: function (args) {
        //
        //},
        onLoop: function (aDelta) {
            //系统更新时触发
            //从改变的node中，检查是否有存在relation关系的节点
            for (var i in this.updatedComponents) {
                //console.log(i);
                var comParent = this.updatedComponents[i];
                var entityParentRender = comParent.property.entity.components.render;
                var entityRender = comParent.entity.components.render;
                //var entityNode = comParent.entity.components.node;
                var r = -Math.PI / 180 * entityParentRender.property.rotation;
                var x = entityRender.property.x * entityParentRender.property.scaleX;
                var y = entityRender.property.y * entityParentRender.property.scaleY;
                var newX = x * Math.cos(r) + y * Math.sin(r);
                var newY = y * Math.cos(r) - x * Math.sin(r);
                //console.log(x,y,newX,newY)
                entityRender.property.x = newX + entityParentRender.property.x;
                entityRender.property.y = newY + entityParentRender.property.y;

                entityRender.property.scaleX *= entityParentRender.property.scaleX;
                entityRender.property.scaleY *= entityParentRender.property.scaleY;
                entityRender.property.rotation += entityParentRender.property.rotation;
                entityRender.property.alpha *= entityParentRender.property.alpha;
                //entityRender.property.canvas = entityParentRender.property.canvas;
                entityRender.update();
            }
        }
    });
}).call(engine);