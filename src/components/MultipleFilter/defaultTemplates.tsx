export const defaultItemTemplate = `
    <input
        type="checkbox"
        id="filter_{{uid}}"
        class="as-multipleFilter__itemCheckbox"
        {{#isActive}}checked="checked"{{/isActive}}
    >
    <label
        class="as-multipleFilter__itemName"
        for="filter_{{uid}}"
    >
        {{{values.name}}}
    </label>
    <span class="as-multipleFilter__itemNumber">
        {{n}}
    </span>
`;
