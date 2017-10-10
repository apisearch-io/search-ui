import AbstractWidget from "./AbstractWidget";

export default class Result extends AbstractWidget {
    constructor(target, {
        className = '',
        data = {}
    }) {
        super(target);

        this.className = className;
        this.data = data;
    }

    render() {
        let target = document.querySelector(this.target);
        let items = (typeof this.data.items !== 'undefined')
            ? this.data.items
            : []
        ;

        target.innerHTML = items.map(item => {
            return `<div class="${this.className}">${item.metadata.content}</div>`;
        });
    }
}