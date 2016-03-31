window.Colors = window.Colors || {};
Colors = new (function () {
    this.colors = {};

    var registerColors = [
        {flag: "editor_bg", color: "#888888"},
        {flag: "editor_menu", color: "#3c3f41"},
        {flag: "white", color: "#fff"},
        {flag: "ui_button_editor_bg", color: "rgb(75,80,82)"},

    ];
    for (var i = 0; i < registerColors.length; i++) {
        this.colors[registerColors[i].flag] = registerColors[i].color;
    }
    this.get = function (aFlag) {
        return this.colors[aFlag] || aFlag;
    }
})();