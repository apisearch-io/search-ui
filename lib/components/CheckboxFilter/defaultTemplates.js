"use strict";
exports.__esModule = true;
exports.defaultItemTemplate = void 0;
exports.defaultItemTemplate = "\n    <input\n        type=\"checkbox\"\n        class=\"as-checkboxFilter__checkbox\"\n        id=\"filter_{{uid}}\"\n        {{#isActive}}checked=\"checked\"{{/isActive}}\n    />\n    <label\n        class=\"as-checkboxFilter__label\"\n        for=\"filter_{{uid}}\"\n    >\n        {{{label}}}\n    </label>\n    <span class=\"as-checkboxFilter__itemNumber\">\n        {{n}}\n    </span>\n";
