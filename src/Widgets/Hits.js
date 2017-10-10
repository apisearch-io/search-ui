import AbstractReadWidget from "./AbstractReadWidget";

export default class Hits extends AbstractReadWidget {
    constructor(target, {
        className = '',
        data = {}
    }) {
        super(target);

        this.className = className;
    }

    render(data) {
        let target = document.querySelector(this.target);

        target.innerHTML = `<span class="${this.className}">${data.total_hits || 0}</span>`;
    }
}