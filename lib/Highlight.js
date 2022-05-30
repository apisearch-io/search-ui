"use strict";
exports.__esModule = true;
exports.levenshteinDistance = exports.highlightLine = exports.highlightElement = void 0;
function highlightElement(element, inputText) {
    var children = element.querySelectorAll(".highlight");
    var inputTextParts = inputText.split(" ").filter(function (word) { return (word !== ""); });
    for (var i = 0; i < children.length; i++) {
        highlightLine(children[i], inputTextParts);
    }
}
exports.highlightElement = highlightElement;
function highlightLine(element, inputTextParts) {
    var lineText = element.textContent;
    var lineTextParts = lineText.split(" ").filter(function (word) { return (word !== ""); });
    var replaces = {};
    for (var i = 0; i < lineTextParts.length; i++) {
        for (var j = 0; j < inputTextParts.length; j++) {
            var lineWord = lineTextParts[i];
            var inputWord = inputTextParts[j];
            var minLength = Math.min(lineWord.length, inputWord.length);
            minLength = Math.max(minLength, inputWord.length);
            var lineWordSplit = lineWord.substring(0, minLength).toLowerCase();
            var inputWordSplit = inputWord.substring(0, minLength).toLowerCase();
            var distance = levenshteinDistance(lineWordSplit, inputWordSplit);
            var allowedDistance = 0;
            if (minLength >= 5 && minLength < 10) {
                allowedDistance = 1;
            }
            else if (minLength >= 10) {
                allowedDistance = 2;
            }
            if (distance <= allowedDistance) {
                replaces[lineWord] = "<em>" + lineWord + "</em>";
                break;
            }
        }
    }
    for (var _i = 0, _a = Object.entries(replaces); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        lineText = lineText.replaceAll(key, value);
    }
    element.innerHTML = lineText;
}
exports.highlightLine = highlightLine;
function levenshteinDistance(str1, str2) {
    if (str1 === void 0) { str1 = ""; }
    if (str2 === void 0) { str2 = ""; }
    var track = Array(str2.length + 1).fill(null).map(function () {
        return Array(str1.length + 1).fill(null);
    });
    for (var i = 0; i <= str1.length; i += 1) {
        track[0][i] = i;
    }
    for (var j = 0; j <= str2.length; j += 1) {
        track[j][0] = j;
    }
    for (var j = 1; j <= str2.length; j += 1) {
        for (var i = 1; i <= str1.length; i += 1) {
            var indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
            track[j][i] = Math.min(track[j][i - 1] + 1, // deletion
            track[j - 1][i] + 1, // insertion
            track[j - 1][i - 1] + indicator);
        }
    }
    return track[str2.length][str1.length];
}
exports.levenshteinDistance = levenshteinDistance;
