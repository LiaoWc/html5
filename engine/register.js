//window.engine = window.engine || {};
//(function () {
//    var tLast = 0;
//    var raf = (function () {
//        return window.requestAnimationFrame ||
//            window.webkitRequestAnimationFrame ||
//            window.mozRequestAnimationFrame ||
//            window.oRequestAnimationFrame ||
//            window.msRequestAnimationFrame;
//    })();
//    var _allRegisterComponent = {};
//    this.registerComponent = function (aRegisterComponent) {
//        _allRegisterComponent[aRegisterComponent.name] = aRegisterComponent;
//    };
//    var _allRegisterSystem = {};
//    this.registerSystem = function (aRegisterSystem) {
//        _allRegisterSystem[aRegisterSystem.name] = aRegisterSystem;
//    };
//    this.getRegisterComponent = function (){
//        return _allRegisterComponent;
//    }
//    this.getRegisterSystem = function (){
//        return _allRegisterSystem;
//    }
//
//}).call(engine);