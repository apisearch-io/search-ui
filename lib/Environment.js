"use strict";
exports.__esModule = true;
exports.createEnvironmentId = void 0;
/**
 * Create an envID
 */
var createEnvironmentId = function () { return "env_".concat(Math.ceil(Math.random() * (9999999 - 1) + 1)); };
exports.createEnvironmentId = createEnvironmentId;
