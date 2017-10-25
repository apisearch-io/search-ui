Apisearch UI
============
The ApisearchUI is an easy interface library to build searches
the easy way. It provides a list of pre-built widgets to
setup your custom search experience.

A widget can be a search input, a result list, filters, pagination, 
and many more explained below.

All Apisearch widgets are passed using `addWidget(widget)` method,
or using `addWidgets(...widgets)` to add widgets in a bulk mode.

Once your setup is done, you just call the `init()` method to 
start all the magic!

## Usage
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

## Widgets

### Search input
The search input widget is to perform text based 
searches.

```javascript
const searchWidget = ui.widgets.search({ 
  target: string,
  placeholder: [string],
  classNames: {
      input: [string],
      container: [string]
  }
});
```

### Search result
The result widget allows you to print a set of results
based on the search.

```javascript
const resultWidget = ui.widgets.result({
  target: string,
  classNames: {
      container: [string]
  },
  template: {
      top: [string],
      body: string,
      bottom: [string]
  }
});
```

### Result information
The result information widget allows you to provide
to a user some extra information about the search.
Currently only can show the **number of hits** of 
the current search and the total **number of items**.

```javascript
const resultInformationWidget = ui.widgets.resultInformation({
  target: string,
  classNames: {
      container: [string]
  },
  template: {
      container: string,
  }
});
```

The variables `{{total_hits}}` and `{{total_items}}`
can be passed on the template body.

## Todo's
  
 [x] Search input
 [ ] Suggestions
 [x] Result box 
 [x] Result Information
 [ ] SortBy filter
 [ ] Rating filter
 [ ] Range filter
 [ ] Pagination