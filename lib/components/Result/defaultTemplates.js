"use strict";
exports.__esModule = true;
exports.defaultItemsListTemplate = "\n    <ul>\n    {{#items}}\n        <li class=\"as-result__item\">\n            <strong>Uuid:</strong> {{uuid.type}} - {{uuid.id}} <br />\n            <strong>Metadata:</strong> {{metadata}} <br />\n            <strong>Indexed metadata:</strong> {{indexedMetadata}}\n        </li>\n    {{/items}}\n    </ul>\n    {{^items}}No result{{/items}}\n";
