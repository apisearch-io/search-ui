export const defaultItemsListTemplate = `
    <div>
    {{#items}}
        <div class="as-result__item" data-id="{{uuid_composed}}">
            <strong>Score:</strong> {{score}}<br />
            <strong>Uuid:</strong> {{uuid.type}} - {{uuid.id}}<br />
            <strong>Title:</strong> {{{fields.title}}}<br />
            <strong>Description:</strong> {{fields.description}}<br />
            <strong>Link:</strong> <a href="{{metadata.link}}" onclick="{{click}}" target="_blank">{{metadata.link}}</a>
        </div>
    {{/items}}
    </div>
    {{^items}}No results{{/items}}
`;

export const defaultItemTemplate = `
    <strong>Score:</strong> {{score}}<br />
    <strong>Uuid:</strong> {{uuid.type}} - {{uuid.id}}<br />
    <strong>Title:</strong> {{{fields.title}}}<br />
    <strong>Description:</strong> {{fields.description}}<br />
    <strong>Link:</strong> <a href="{{metadata.link}}" onclick="{{click}}" target="_blank">{{metadata.link}}</a>
`;

export const defaultNoResultsItemTemplate = `
    No results
`;
