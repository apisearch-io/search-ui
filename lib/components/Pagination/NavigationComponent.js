"use strict";
exports.__esModule = true;
var preact_1 = require("preact");
var Template_1 = require("../Template");
/**
 * Arrow navigation component
 */
function NavigationComponent(_a) {
    var isVisible = _a.isVisible, classNames = _a.classNames, template = _a.template, handleClick = _a.handleClick;
    return (isVisible)
        ? (preact_1.h("li", { className: classNames, onClick: handleClick },
            preact_1.h(Template_1["default"], { template: template, dictionary: this.props.dictionary })))
        : null;
}
exports["default"] = NavigationComponent;
