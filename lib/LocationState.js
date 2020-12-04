"use strict";
exports.__esModule = true;
exports.isLocationState = void 0;
function isLocationState(object) {
    var myInterface = object;
    if (myInterface === null) {
        return false;
    }
    return ((myInterface.query !== undefined) &&
        (myInterface.result !== undefined));
}
exports.isLocationState = isLocationState;
