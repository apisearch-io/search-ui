import AbstractReadWriteWidget from "./AbstractReadWriteWidget";

export default class SortBy extends AbstractReadWriteWidget {
    constructor(target, {
        className = '',
        field = '',
        order = '',
        eventTrigger = 'change'
    }) {
        super(target);

        this.className = className;
        this.field = field;
        this.order = order;
        this.eventTrigger = eventTrigger;
    }

    render(data) {
        let target = document.querySelector(this.target);

        target.innerHTML = `<select class="${this.className}">
            <option value="asc">Ascendent</option>
            <option value="desc">Descendent</option>
        </select>`;
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