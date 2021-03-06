"use strict";
exports.__esModule = true;
exports.Dispatcher = void 0;
var Dispatcher = /** @class */ (function () {
    function Dispatcher() {
        this.events = {};
    }
    Dispatcher.prototype.registerListener = function (event, callback) {
        // Create the event if not exists
        if (this.events[event] === undefined) {
            this.events[event] = {
                listeners: []
            };
        }
        this.events[event].listeners.push(callback);
    };
    Dispatcher.prototype.dispatch = function (event, payload) {
        this.events[event].listeners.forEach(function (listener) {
            listener(payload);
        });
    };
    return Dispatcher;
}());
exports.Dispatcher = Dispatcher;
