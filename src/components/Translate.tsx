class Translate {
    public static trans(text, dictionary) {
        let parsed = [];
        try {
            parsed = JSON.parse(text);
        } catch {
            return dictionary[text] ?? text;
        }

        let parsedText = parsed[0] ?? text;
        parsedText = dictionary[parsedText] ?? parsedText;

        for (let i = 1; i <= parsed.length; i++) {
            parsedText = parsedText.replace("$" + i, parsed[i]);
        }

        return parsedText;
    }
}

export default Translate;
