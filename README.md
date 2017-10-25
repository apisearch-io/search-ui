Apisearch UI
============

# Usage
This simple setup allows you to build a full text search
input with a result container using a custom template 
engine.

```javascript
const ui = apisearchUI('your_api_key');

ui.addWidgets(
    ui.widgets.search({
        target: '.search-container',
    }),
    ui.widgets.result({
        target: '.result-container',
        template: {
            body: '<ul>{{#items}} <li>{{metadata.name}}</li> {{/items}}</ul>',
        }
    })
);

ui.init();
```

# Widgets

## Search input

The search input widget is to perform text based 
searches.

```javascript
const searchWidget = ui.widgets.search({ 
  target: [string],
  placeholder: [string],
  classNames: {
      input: [string],
      container: [string]
  }
});
```

## Search result
The result widget allows you to print a set of results
based on the search.

```javascript
const resultWidget = ui.widgets.result({ 
  target: [string],
  classNames: {
      container: [string]
  },
  template: {
      header: [string],
      body: [string],
      footer: [string]
  }
});
```

# Todo's
- Search input
- Filter rating
- Filter range
- Filter checkbox
- Pagination
- Suggestions