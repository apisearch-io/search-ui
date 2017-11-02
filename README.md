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

## npm
```shell
npm install apisearch-ui --save
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
const ui = apisearchUI('your_api_key');

ui.addWidgets(
    ui.widgets.simpleSearch({
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

## Simple Search
The simple search input widget is to perform text based 
searches.

This widget points to `searchable_metadata` and 
`exact_matching_metadata` field of the indexed items.

```javascript
const simpleSearchWidget = ui.widgets.simpleSearch({ 
  target: !string,
  placeholder: ?string,
  classNames: {
      container: ?string,
      input: string
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

## Search result
The result widget allows you to print a set of results
based on the search.

```javascript
const resultWidget = ui.widgets.result({
  target: !string,
  classNames: {
      container: ?string
  },
  template: {
      top: ?string,
      body: !string,
      bottom: ?string
  }
});
```

You can customize your results template on the template 
attribute section:
 * `top`: (optional) will be placed as a header of the result set.
 * `body`: (required) will be the iterable set of results.
 * `bottom`: (optional) will be placed as a footer of your result set.
 
The result items will be accessible on the body attribute using
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
const resultsTemplate = `<ul>
{{#items}}
    <li>
        <img src="{{metadata.img}}" />
        <h1>{{metadata.name}}</h1>
    </li>
{{/items}}
</ul>`;
```

For more information about how this templating system works,
refer to the [twitter's hogan.js documentation](http://twitter.github.io/hogan.js/). 
Or check the library examples.

## Result information
The result information widget allows you to provide
to a user some extra information about the search.
Currently only can show the **number of hits** of 
the current search and the total **number of items**.

```javascript
const resultInformationWidget = ui.widgets.resultInformation({
  target: !string,
  classNames: {
      container: ?string
  },
  template: {
      container: !string,
  }
});
```

The variables `{{total_hits}}` and `{{total_items}}`
can be passed on the template body.


# Todo's
  
- [x] Simple Search
   - [ ] Promote results
   - [ ] Exclude results
- [x] Suggested Search
   - [ ] Promote results
   - [ ] Exclude results
   
- [x] Simple Result box
   - [ ] Highlighted result
- [ ] Infinite Result box
   - [ ] Highlighted result
- [x] Result Information

- [x] SortBy
   - [ ] Random sort
- [ ] Checkbox filter
- [ ] Menu filter
- [ ] Rating filter
- [ ] Range filter
- [ ] Pagination

- [ ] Analytics / User analytics

Extra todo list:
- [ ] Add callbacks before and after a widget action
to execute customized anonymous functions.
- [ ] Work with propTypes?
 
# Widget creation workflow
 1. Define widget properties
 2. Create component
 3. Create widget factory method
 4. Create widget action