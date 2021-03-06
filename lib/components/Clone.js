"use strict";
exports.__esModule = true;
var Clone = /** @class */ (function () {
    function Clone() {
    }
    Clone.object = function (object) {
        return Object.assign(Object.create(Object.getPrototypeOf(object)), object);
    };
    return Clone;
}());
exports["default"] = Clone;
