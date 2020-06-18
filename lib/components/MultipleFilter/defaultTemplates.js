"use strict";
exports.__esModule = true;
exports.defaultItemTemplate = "\n    <input\n        type=\"checkbox\"\n        id=\"filter_{{uid}}\"\n        class=\"as-multipleFilter__itemCheckbox\"\n        {{#isActive}}checked=\"checked\"{{/isActive}}\n    >\n    <label\n        class=\"as-multipleFilter__itemName\"\n        for=\"filter_{{uid}}\"\n    >\n        {{{values.name}}}\n    </label>\n    <span class=\"as-multipleFilter__itemNumber\">\n        {{n}}\n    </span>\n";
