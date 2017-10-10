import AbstractWidget from "./AbstractWidget";

export default class Input extends AbstractWidget {
    constructor(target, {
        className = '',
        type = 'text',
        value = '',
        placeholder = '',
        eventTrigger,
        data = {}
    }) {
        super(target);

        this.className = className;
        this.type = type;
        this.value = value;
        this.placeholder = placeholder;

        // widget event trigger
        this.eventTrigger = 'keyup';

        // data
        this.data = data;
    }

    render() {
        let target = document.querySelector(this.target);

        target.innerHTML = `<input
            class="${this.className}" 
            type="${this.type}" 
            value="${this.value}" 
            placeholder="${this.placeholder}">`;
    }

    updateQuery(query, value) {
        return Object.assign(
            Object.create(query),
            {
                ...query,
                q: value
            },
        );
    }
}