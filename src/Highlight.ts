export function highlightElement(element, inputText) {
    const children = element.querySelectorAll(".highlight");
    const inputTextParts = inputText.split(" ").filter((word) => (word !== ""));
    for (let i = 0; i < children.length; i++) {
        highlightLine(children[i], inputTextParts);
    }
}

export function highlightLine(element, inputTextParts) {
    let lineText = element.textContent;
    const lineTextParts = lineText.split(" ").filter((word) => (word !== ""));
    const replaces = {};
    for (let i = 0; i < lineTextParts.length; i++) {
        for (let j = 0; j < inputTextParts.length; j++) {
            const lineWord = lineTextParts[i];
            const inputWord = inputTextParts[j];
            let minLength = Math.min(lineWord.length, inputWord.length);
            minLength = Math.max(minLength, inputWord.length);

            const lineWordSplit = lineWord.substring(0, minLength).toLowerCase();
            const inputWordSplit = inputWord.substring(0, minLength).toLowerCase();
            const distance = levenshteinDistance(lineWordSplit, inputWordSplit);

            let allowedDistance = 0;
            if (minLength >= 5 && minLength < 10) {
                allowedDistance = 1;
            } else if (minLength >= 10) {
                allowedDistance = 2;
            }

            if (distance <= allowedDistance) {
                replaces[lineWord] = "<em>" + lineWord + "</em>";
                break;
            }
        }
    }

    for (const [key, value] of Object.entries(replaces)) {
        lineText = lineText.replaceAll(key, value);
    }

    element.innerHTML = lineText;
}

export function levenshteinDistance(str1 = "", str2 = "") {
    const track = Array(str2.length + 1).fill(null).map(() =>
        Array(str1.length + 1).fill(null));
    for (let i = 0; i <= str1.length; i += 1) {
        track[0][i] = i;
    }
    for (let j = 0; j <= str2.length; j += 1) {
        track[j][0] = j;
    }
    for (let j = 1; j <= str2.length; j += 1) {
        for (let i = 1; i <= str1.length; i += 1) {
            const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
            track[j][i] = Math.min(
                track[j][i - 1] + 1, // deletion
                track[j - 1][i] + 1, // insertion
                track[j - 1][i - 1] + indicator, // substitution
            );
        }
    }
    return track[str2.length][str1.length];
}
