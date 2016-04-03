window.engine = window.engine || {};
(function() {
    engine.registerComponent = engine.registerComponent || [];
    this.registerComponent.push({
        name: "node",
        needs: ["render", "hierarchy"],
        unique: true,
        property: [
            { key: 'x', value: 0 },
            { key: 'y', value: 0 },
            { key: 'scaleX', value: 1 },
            { key: 'scaleY', value: 1 },
            { key: 'rotation', value: 0 },
            { key: "width", value: 0 },
            { key: "height", value: 0 },
            { key: "anchorPointX", value: 0 },
            { key: "anchorPointY", value: 0 },
            { key: "alpha", value: 1 },
        ]
    });

    engine.registerSystem = engine.registerSystem || [];
    this.registerSystem.push({
        name: "node",
        priority: 2,
        systemComponent: ["node"],
        //onInit: function () {
        //    //拥有node的实体
        //},
        // onAdd: function(aComponent) {
        //     //组件加入时触发
        // },
        // onRemove: function (aComponent) {
        //    //组件移除时触发
        // },
        onUpdate: function(aComponent) {
            //组件改变时触发
            if (aComponent.entity.components.children) {
                aComponent.entity.components.children.update();
            }
        },
        onLoop: function(aDelta) {
            //系统更新时触发
            for (var i in this.updatedComponents) {
                //console.log(i);
                //node发生改变
                var comNode = this.updatedComponents[i];
                var comRender = comNode.entity.components.render;
                //console.log(comRender,comNode)
                comRender.property.x = comNode.property.x ;
                comRender.property.y = comNode.property.y ;
                comRender.property.scaleX = comNode.property.scaleX;
                comRender.property.scaleY = comNode.property.scaleY;
                comRender.property.rotation = comNode.property.rotation;
                comRender.property.alpha = comNode.property.alpha;
                if(comNode.entity.components.parent){
                    comNode.entity.components.parent.update();
                }
                comRender.update();
            }
        }
    });
}).call(engine);