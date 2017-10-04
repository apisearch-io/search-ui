import AbstractWidget from "./AbstractWidget";

export default class Input extends AbstractWidget {
    constructor(target, {
        className = '',
        type = 'text',
        value = '',
        placeholder = ''
    }) {
        super(target);

        this.className = className;
        this.type = type;
        this.value = value;
        this.placeholder = placeholder;
    }

    render() {
        let target = document.querySelector(this.target);

        target.innerHTML = `<input
            class="${this.className}" 
            type="${this.type}" 
            value="${this.value}" 
            placeholder="${this.placeholder}">`;
    }
}