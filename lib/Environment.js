"use strict";
exports.__esModule = true;
exports.createEnvironmentId = void 0;
/**
 * Create an envID
 */
exports.createEnvironmentId = function () { return "env_" + Math.ceil(Math.random() * (9999999 - 1) + 1); };
