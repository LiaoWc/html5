window.engine = window.engine || {};
(function () {
    this.values = new (function () {
        var creator = {};
        creator["int"] = function () {
            var value = 0;
            var type = "int";
            this.getType = function () {
                return type;
            };
            var flag = "int";
            this.setFlag = function (aFlag) {
                flag = aFlag;
            };
            this.setValue = function (aValue) {
                if (typeof (aValue) == "number") {
                    var oldValue = value;
                    var newValue = parseInt(aValue);
                    if (oldValue != newValue) {
                        value = newValue;
                        if (this.onUpdated) {
                            this.onUpdated({flag: flag, old: oldValue, new: newValue});
                        }
                    }
                }
            };
            this.getValue = function () {
                return value;
            };
        };
        creator["float"] = function () {
            var value = 0;
            var type = "float";
            this.getType = function () {
                return type;
            };
            var flag = "float";
            this.setFlag = function (aFlag) {
                flag = aFlag;
            };
            this.setValue = function (aValue) {
                if (typeof (aValue) == "number") {
                    var oldValue = value;
                    var newValue = aValue.toFixed(2);
                    if (oldValue != newValue) {
                        value = newValue;
                        if (this.onUpdated) {
                            this.onUpdated({flag: flag, old: oldValue, new: newValue});
                        }
                    }
                }
            };
            this.getValue = function () {
                return value;
            };
        };
        creator["number"] = creator["float"];
        creator["string"] = function () {
            var value = 0.00;
            var type = "string";
            this.getType = function () {
                return type;
            };
            var flag = "string";
            this.setFlag = function (aFlag) {
                flag = aFlag;
            };
            this.setValue = function (aValue) {
                if (typeof (aValue) == "string") {
                    var oldValue = value;
                    var newValue = aValue;
                    if (oldValue != newValue) {
                        value = newValue;
                        if (this.onUpdated) {
                            this.onUpdated({flag: flag, old: oldValue, new: newValue});
                        }
                    }
                }
            };
            this.getValue = function () {
                return value;
            }
        };
        creator["bool"] = function () {
            var value = true;
            var type = "bool";
            this.getType = function () {
                return type;
            };
            var flag = "bool";
            this.setFlag = function (aFlag) {
                flag = aFlag;
            };
            this.setValue = function (aValue) {
                if (typeof (aValue) == "bool") {
                    var oldValue = value;
                    var newValue = aValue;
                    if (oldValue != newValue) {
                        value = newValue;
                        if (this.onUpdated) {
                            this.onUpdated({flag: flag, old: oldValue, new: newValue});
                        }
                    }
                }
            };
            this.getValue = function () {
                return value;
            }
        };
        creator["function"] = function () {
            var value = function (){};
            var type = "function";
            this.getType = function () {
                return type;
            };
            var flag = "function";
            this.setFlag = function (aFlag) {
                flag = aFlag;
            };
            this.setValue = function (aValue) {
                if (typeof (aValue) == "function") {
                    var oldValue = value;
                    var newValue = aValue;
                    if (oldValue != newValue) {
                        value = newValue;
                        if (this.onUpdated) {
                            this.onUpdated({flag: flag, old: oldValue, new: newValue});
                        }
                    }
                }
            };
            this.getValue = function () {
                return value;
            }
        };
        this.new = function (aValueType) {
            var tValuesCreator = creator[aValueType];
            if (tValuesCreator) {
                return new tValuesCreator();
            }
        }
    })();
}).call(engine);


//var table = function () {
//    var value = {};
//    var type = "table";
//    this.getType = function () {
//        return type;
//    };
//    this.set = functiValueon (aValue) {
//        if (typeof (aValue) == "object") {
//            value = aValue
//        }
//    };
//    this.get = function () {
//        return value;
//    }
//};

//var array = function () {
//    var value = [];
//    var type = "string";
//    this.getType = function () {
//        return type;
//    };
//    this.set = functiValueon (aValue) {
//        if (typeof (aValue) == "string") {
//            value = aValue
//        }
//    };
//    this.get = function () {
//        return value;
//    }
//};