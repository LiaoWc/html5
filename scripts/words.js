window.Words = window.Words || {};
Words = new (function () {
    this.items = {};

    var registerWords = [
        {English: "Menu", Chinese: "菜单"},
        {English: "project", Chinese: "项目"},
        {English: "Entity", Chinese: "实体"},
        {English: "Property", Chinese: "属性"},
        {English: "Stage", Chinese: "舞台"},
        {English: "Transform", Chinese: "变换"},
        {English: "Register Component", Chinese: "注册组件"},
        //{flag: "white", color: "#fff"}
    ];
    for (var i = 0; i < registerWords.length; i++) {
        this.items[registerWords[i].English] = registerWords[i];
    }
    this.get = function (aFlag) {
        //console.log(this.items[aFlag],aFlag);
        if (this.items[aFlag]) {
            return this.items[aFlag].English || aFlag;
        } else {
            return aFlag;
        }


    }
})();