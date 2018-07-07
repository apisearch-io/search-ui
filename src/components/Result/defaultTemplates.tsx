export const defaultItemsListTemplate = `
    <ul>
    {{#items}}
        <li class="as-result__item">
            <strong>Uuid:</strong> {{uuid.type}} - {{uuid.id}} <br />
            <strong>Metadata:</strong> {{metadata}} <br />
            <strong>Indexed metadata:</strong> {{indexedMetadata}}
        </li>
    {{/items}}
    </ul>
    {{^items}}No result{{/items}}
`;