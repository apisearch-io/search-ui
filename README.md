Apisearch UI
============

> This repository is part of the ApiSearch project. To get more 
> information about it, please visit [http://apisearch.io](http://apisearch.io). 
> This a project created with love by [Puntmig Development SLU](http://puntmig.com).

The ApisearchUI is an easy interface library to build searches
the easy way. It provides a list of pre-built widgets to
setup your custom search experience. A widget can be a search input, 
a result list, filters, pagination, and many more explained below.

All Apisearch widgets are passed using `addWidget(widget)` method,
or using `addWidgets(...widgets)` to add widgets in a bulk mode.

Once your setup is done, you just call the `init()` method to 
start all the magic!

# Install

## npm & yarn
```shell
npm install apisearch-ui --save
# or
yarn add apisearch-ui
```

## html tag \<script\>
You can either download the library and use a relative path to your assets folder, 
or use a CDN like jsDelivr. 
```html
<script src="https://cdn.jsdelivr.net/npm/apisearch-ui/dist/apisearch-ui.min.js"></script>
``````

# Usage
This simple setup allows you to build a full text search
input with a result container using a custom template 
engine.

```javascript
const ui = apisearchUI({
    appId: 'music',
    apiKey: '1cc7a3e0-bda5-11e7-abc4-cec278b6b50a',
    options: {
        endpoint: 'http://search.puntmig.net',
        cache: true
    }
});

ui.addWidgets(
    ui.widgets.simpleSearch({
        target: '.search-container',
    }),
    ui.widgets.result({
        target: '.result-container',
        template: {
            itemsList: '<ul>{{#items}} <li>{{metadata.name}}</li> {{/items}}</ul>',
        }
    })
);

ui.init();
```
> Check more examples 
> [here](https://github.com/puntmig/javascript-search-ui/tree/master/examples)!

# Widgets

## Simple Search
The simple search input widget is to perform text based 
searches.

This widget points to `searchable_metadata` and 
`exact_matching_metadata` field of the indexed items.

```javascript
const simpleSearchWidget = ui.widgets.simpleSearch({ 
  target: !string,
  placeholder: ?string,
  autofocus: ?bool[false],
  classNames: {
      container: ?string,
      input: ?string
  }
});
```

## Suggested Search
The suggested search input goes one step further. You can
get auto-completed suggestions list related to the text
you are looking for just below the search input.

```javascript
const suggestedSearchWidget = ui.widgets.suggestedSearch({ 
  target: !string,
  placeholder: ?string,
  autofocus: ?bool[false],
  classNames: {
      container: ?string,
      input: ?string,
      box: ?string,
      suggestion: ?string,
      activeSuggestion: ?string
  }
});
```

## Sort By
The sort by widget allows to order the result set as you like.

This widget points to `indexed_metadata` field.

```javascript
const sortByWidget = ui.widgets.sortBy({
  target: !string,
  classNames: {
      container: ?string,
      select: ?string
  },
  options: [
      {name: !string, value: !string},
      {name: !string, value: !string},
      // ...
  ]
});
```

@todo: describe attributes.

## Multiple Filter
The filter widget allows you to refine your search.

```javascript
const multipleFilterWidget = ui.widgets.multipleFilter({
    target: !string,
    name: !string,
    filterField: !string,
    aggregationField: ?string[filterField],
    applicationType: ?integer[8],
    fetchLimit: ?integer[5],      
    viewLimit: ?integer[fetchLimit], // if default, show more won't be visible
    sortBy: ?string['_count:desc'],
    classNames: {
        container: ?string,
        top: ?string,
        itemsList: ?string,
        item: ?string,
        showMoreContainer: ?string
    },
    template: {
        top: ?string,
        item: !string,
        showMore: ?string['+ Show more'],
        showLess: ?string['- Show less']
    },
    formatData: ?function(itemData)
})
```

@todo: describe attributes.

## Clear filters button
Clear filters widget gives us a button to remove all active
filters.
```javascript
const clearFilters = ui.widgets.clearFilters({
  target: !string,
  classNames: {
      container: ?string
  },
  template: {
      container: ?string['Clear filters']
  }
});
```


## Search result
The result widget allows you to print a set of results
based on the search.

```javascript
const resultWidget = ui.widgets.result({
  target: !string,
  itemsPerPage: ?integer[10],
  highlightsEnabled: ?bool[false],
  classNames: {
      container: ?string
  },
  template: {
      itemsList: !string,
      placeholder: ?string
  },
  formatData: ?function(resultData)
});
```

You can customize your results template on the `template` 
attribute section:
 * `itemsList`: (required) will be the iterable set of results.
 * `placeholder`: (optional) will be placed on initial widget render.
 Once a search is performed, this placeholder will disappear.

On the `itemsList` template you have access to this two variables:
 * `items`: an array of resulted items.
 * `query`: the query text made for the search.
 
The variable `items` will be accessible on the body attribute using
the `{{#items}}{{/items}}` iterable. For example, given this array 
of results:

```javascript
{
    items: [
        {
            uuid: {
                source: 'Ba7XMhGh6yy',
                type: 'marvel'
            },
            metadata: {
                name: 'Tony Stark',
                img: 'https://api.marvel.com/v2/characters/tony-stark'
            }
        },
        {
            uuid: {
                source: 'Ba6mSyvhAJt',
                type: 'marvel'
            },
            metadata: {
                name: 'Peter Parker',
                img: 'https://api.marvel.com/v2/characters/peter-parker'
            }
        }
    ]
}
```

You will be able to build your results like this, and
passing the string to the `body` template attribute:

```javascript
const resultsTemplate = `
<ul>
{{#items}}
    <li>
        <img src="{{metadata.img}}" />
        <h1>{{metadata.name}}</h1>
    </li>
{{/items}}
</ul>
{{^items}}
    No results found for this search: <b>{{query}}</b> :(
{{^items}}
`;
```

For more information about how this templating system works,
refer to the [twitter's hogan.js documentation](http://twitter.github.io/hogan.js/). 
Or check the library examples.

## Information (Result info)
The result information widget allows you to provide
to a user some extra information about the search.
Currently only can show the **number of hits** of 
the current search and the total **number of items**.

```javascript
const resultInformationWidget = ui.widgets.information({
  target: !string,
  classNames: {
      container: ?string
  },
  template: {
      container: !string['Found {{total_hits}} of {{total_items}} items'],
  },
  formatData: ?function(resultInformationData)
});
```

The variables `{{total_hits}}` and `{{total_items}}`
can be passed on the template body.


# Testing

The test suite is build on top of [Jest](https://facebook.github.io/jest/) 
and [preact-render-spy](https://github.com/mzgoddard/preact-render-spy), a 
simplified clone of Enzyme for Preact.

To run test type:
```shell
npm t
# or
yarn test
```

<hr />

# For developers

## Data workflow

Let's start with a small introduction. When working with ApisearchUI
you have to keep in mind that you can work with multiple ApisearchUI
instances at once. 

This instances need a client to request all the data from the Apisearch 
servers. The thing is, you can work with only one client if all your 
ApisearchUI instances consume the same data store (index). Or with 
many clients if you want all your ApisearchUI instances to consume from
many different indexes.

Single ApisearchUI instance flow:
```
View (Widget components) -> action -> request (apisearch client) -> reduce received data -> update store -> re-render view
```

## Widget development
 1. Define widget properties in README as a skeleton.
 2. Create component on `src/Widgets`.
 3. Create widget factory method in `src/Factory/WidgetFactory.js`
 and pass all needed widget properties.
 4. Create widget action.
 5. Test the widget.

<hr />

# Todo's
  
- [x] Simple Search
   - [ ] Clear search
- [x] Suggested Search
   
- [x] Simple Result box
   - [x] Highlighted result
   - [ ] Promote results
   - [ ] Exclude results
- [ ] Infinite Result box
- [x] Result Information
- [ ] Pagination
- [ ] Results per page selector

- [x] SortBy
   - [ ] Random sort
- [x] Multiple filter
- [x] Rating filter (it's a multiple filter selector)
- [x] Clear filters button
- [ ] Simple filter
- [ ] Select filter
- [ ] Menu filter
- [ ] Range filter

- [ ] Analytics / User analytics

Extra todo list:
- [ ] Add callbacks before and after a widget action
to execute customized anonymous functions.
- [ ] Work with propTypes?
