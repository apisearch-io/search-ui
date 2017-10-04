import AbstractWidget from "./AbstractWidget";

export default class Hits extends AbstractWidget {
    constructor(target, {
        className = '',
        textValue = ''
    }) {
        super(target);

        this.className = className;
        this.textValue = textValue;
    }

    render() {
        let target = document.querySelector(this.target);

        target.innerHTML = `<span class="${this.className}">${this.textValue}</span>`;
    }
}