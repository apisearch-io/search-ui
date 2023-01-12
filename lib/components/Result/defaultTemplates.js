"use strict";
exports.__esModule = true;
exports.defaultNextPageButtonTemplate = exports.defaultAlternativeAllResultsTemplate = exports.defaultAlternativeTitleTemplate = exports.defaultNoResultsItemTemplate = exports.defaultItemTemplate = exports.defaultItemsListTemplate = void 0;
exports.defaultItemsListTemplate = "\n    <div>\n    {{#items}}\n        <div class=\"as-result__item\" data-id=\"{{uuid_composed}}\">\n            <strong>Score:</strong> {{score}}<br />\n            <strong>Uuid:</strong> {{uuid.type}} - {{uuid.id}}<br />\n            <strong>Title:</strong> {{{fields.title}}}<br />\n            <strong>Description:</strong> {{fields.description}}<br />\n            <strong>Link:</strong> <a href=\"{{metadata.link}}\" onclick=\"{{click}}\" target=\"_blank\">{{metadata.link}}</a>\n        </div>\n    {{/items}}\n    </div>\n    {{^items}}No results{{/items}}\n";
exports.defaultItemTemplate = "\n    <strong>Score:</strong> {{score}}<br />\n    <strong>Uuid:</strong> {{uuid.type}} - {{uuid.id}}<br />\n    <strong>Title:</strong> {{{fields.title}}}<br />\n    <strong>Description:</strong> {{fields.description}}<br />\n    <strong>Link:</strong> <a href=\"{{metadata.link}}\" onclick=\"{{click}}\" target=\"_blank\">{{metadata.link}}</a>\n";
exports.defaultNoResultsItemTemplate = "\n    No results\n";
exports.defaultAlternativeTitleTemplate = "{{{word}}}";
exports.defaultAlternativeAllResultsTemplate = "All results ({{num}})";
exports.defaultNextPageButtonTemplate = "Load page {{page}}";
