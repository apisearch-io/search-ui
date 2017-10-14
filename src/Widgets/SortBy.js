import AbstractReadWriteWidget from "./AbstractReadWriteWidget";

export default class SortBy extends AbstractReadWriteWidget {
    constructor(target, {
        className = '',
        field = '',
        options = [],
        eventTrigger = 'change'
    }) {
        super(target);

        this.className = className;
        this.field = field;
        this.options = options;
        this.eventTrigger = eventTrigger;
    }

    render(data) {
        let target = document.querySelector(this.target);
        let options = this.options.map(option => {
            return `<option value="${option.value}">${option.title}</option>`
        });

        target.innerHTML = `<select class="${this.className}">${options}</select>`;
    }

    updateQuery(query, value) {
        let clonedQuery = Object.assign(
            Object.create(query),
            query
        );

        return clonedQuery.sortBy({
            [`indexed_metadata.${this.field}`]: {
                order: value
            }
        });
    }
}