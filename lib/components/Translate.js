"use strict";
exports.__esModule = true;
var Translate = /** @class */ (function () {
    function Translate() {
    }
    Translate.trans = function (text, dictionary) {
        var _a, _b, _c;
        var parsed = [];
        try {
            parsed = JSON.parse(text);
        }
        catch (_d) {
            return (_a = dictionary[text]) !== null && _a !== void 0 ? _a : text;
        }
        var parsedText = (_b = parsed[0]) !== null && _b !== void 0 ? _b : text;
        parsedText = (_c = dictionary[parsedText]) !== null && _c !== void 0 ? _c : parsedText;
        for (var i = 1; i <= parsed.length; i++) {
            parsedText = parsedText.replace("$" + i, parsed[i]);
        }
        return parsedText;
    };
    return Translate;
}());
exports["default"] = Translate;
