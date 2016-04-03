window.engine = window.engine || {};
(function () {
    engine.registerComponent = engine.registerComponent || [];
    this.registerComponent.push({
        name: "input",
        property: [
            {key: 'fillText', value: 'text'},
            {key: 'fontSize', value: 30},
            {key: 'fontColor', value: '#fff'},
            {key: 'fontName', value: 'system'},
            {key: 'width', value: 0},
            {key: 'height', value: 0},
            {key: 'src', value: null},
        ]
    });
    engine.registerSystem = engine.registerSystem || [];
    this.registerSystem.push({
        name: "input",
        priority: 9,
        systemComponent: ["input"],
        onInit: function () {

        },
        onAdd: function (args) {
            //组件加入时触发
            var input = document.createElement('input');
            window.document.body.appendChild(input);
            var style = input.style;
            style.zIndex = '2';
            style.position = 'absolute';

            //style.border = 'none';
            //style.outline = 'solid';
            //style.background = 'none';
            style.padding = '0px';
            //style.width = "200px";
            //style.bottom = "50px";
            //var height = 100;

            args.component.element = input;
            input.addEventListener("focus", function () {
                engine.input = input;
            }, false);
            //input.addEventListener("blur", function () {
            //    engine.isInputing = false;
            //}, false);
        },
        onRemove: function (args) {
            //组件移除时触发
        },
        onUpdate: function (args) {
            //组件改变时触发
            //var tComponent =  args.component;
            //var tStyle = args.component.element.style;
            //var tProperty = tComponent.property;
            //tStyle.height = tProperty.height;
            //tStyle.width = tProperty.width;
            //tStyle.fontSize =  tProperty.fontSize;
        },
        onLoop: function (aDelta) {

            // var renderUpdatedComponents = engine.manager.systems.render.notUpdatedComponents;
            // for (var i in renderUpdatedComponents) {
            //     //console.log("in")

            //     var com = this.components[i];
            //     if (com) {
            //         var dpr = engine.getDPR();
            //         var renderProperty = com.entity.components.render.property;
            //         com.element.style.width = com.property.width * renderProperty.scaleX / dpr;
            //         com.element.style.height = com.property.height * renderProperty.scaleY / dpr;
            //         com.element.style.fontSize = com.property.fontSize * renderProperty.scaleY / dpr +"px";
            //         com.element.style.top = renderProperty.y / dpr;
            //         com.element.style.left = renderProperty.x / dpr;
            //     }
            // }
        }
    });
}).call(engine);