export const defaultItemTemplate = `
    <input 
        type="checkbox" 
        id="filter_{{values.id}}"
        class="as-multipleFilter__itemCheckbox" 
        {{#isActive}}checked="checked"{{/isActive}}
    >
    <label 
        class="as-multipleFilter__itemName"
        for="filter_{{values.id}}"
    >
        {{{values.name}}}
    </label>
    <span class="as-multipleFilter__itemNumber">
        {{n}}
    </span>
`;