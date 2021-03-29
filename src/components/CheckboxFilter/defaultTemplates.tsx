export const defaultItemTemplate = `
    <input
        type="checkbox"
        class="as-checkboxFilter__checkbox"
        id="filter_{{uid}}"
        {{#isActive}}checked="checked"{{/isActive}}
    />
    <label
        class="as-checkboxFilter__label"
        for="filter_{{uid}}"
    >
        {{{label}}}
    </label>
    <span class="as-checkboxFilter__itemNumber">
        {{n}}
    </span>
`;
