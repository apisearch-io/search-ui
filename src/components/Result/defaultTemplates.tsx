export const defaultItemsListTemplate = `
    <ul>
    {{#items}}
        <li class="as-result__item">
            <strong>Score:</strong> {{score}}<br />
            <strong>Uuid:</strong> {{uuid.type}} - {{uuid.id}}<br />
            <strong>Title:</strong> {{metadata.title}}<br />
            <strong>Description:</strong> {{metadata.description}}<br />
            <strong>Link:</strong> <a href="{{metadata.link}}" onclick="{{click}}" target="_blank">{{metadata.link}}</a>
        </li>
    {{/items}}
    </ul>
    {{^items}}No result{{/items}}
`;
