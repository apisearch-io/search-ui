"use strict";
exports.__esModule = true;
exports.defaultBannerTemplate = void 0;
exports.defaultBannerTemplate = "\n    <div class=\"banner\">\n        {{#has_url}}<a href=\"{{url}}\">{{/has_url}}\n            <picture>\n                <source srcset=\"{{image_prefix}}{{desktop_img}}\" media=\"(min-width: {{breaking_point_size}}px)\" />\n                <img src=\"{{image_prefix}}{{mobile_img}}\" loading=\"lazy\" class=\"soft-lazy\" onload=\"window.asImageShow(this)\" />\n            </picture>\n        {{#has_url}}</a>{{/has_url}}\n    </div>\n";
