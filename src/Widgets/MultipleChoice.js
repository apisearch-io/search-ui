import AbstractReadWriteWidget from "./AbstractReadWriteWidget";

export default class MultipleChoice extends AbstractReadWriteWidget {
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
            return `<label>
                <input type="checkbox" 
                    name="${this.field}"
                    value="${option.value}" 
                    ${option.selected ? 'checked' : ''}
                >
                <span>${option.title}</span>
            </label><br>`;
        });

        target.innerHTML = `<fieldset class="${this.className}">${options.join('')}</fieldset>`;
    }

    updateQuery(query, value) {
        let clonedQuery = Object.assign(
            Object.create(query),
            query
        );

        clonedQuery.filterUniverseBy(
            `indexed_metadata.${this.field}`,
            [
                this.options.map(option => option.value)
            ]
        );
        clonedQuery.filterBy(
            `indexed_metadata.${this.field}`,
            this.field,
            [
                this.options.map(option => option.value)
            ]
        );

        console.log(clonedQuery);

        return clonedQuery;
    }
}