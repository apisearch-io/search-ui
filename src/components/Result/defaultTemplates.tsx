export const defaultItemsListTemplate = `
    <ul>
    {{#items}}
        <li class="as-result__item" key="{{key}}">
            <strong>Score:</strong> {{score}}<br />
            <strong>Uuid:</strong> {{uuid.type}} - {{uuid.id}}<br />
            <strong>Title:</strong> {{{fields.title}}}<br />
            <strong>Description:</strong> {{fields.description}}<br />
            <strong>Link:</strong> <a href="{{metadata.link}}" onclick="{{click}}" target="_blank">{{metadata.link}}</a>
        </li>
    {{/items}}
    </ul>
    {{^items}}No result{{/items}}
`;
