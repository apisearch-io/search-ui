/**
 * @jsx h
 */

/**
 * Vendors
 */
import apisearch from 'apisearch';
import { createStore } from 'redux';
import { h, render, createElement } from 'preact';

/**
 * Locals
 */
import WidgetFactory from "./WidgetFactory";
import {searchReducer} from 'Widgets/Search/searchReducer';

/**
 * Redux Store
 */
const store = createStore(searchReducer, {});

/**
 * Apisearch UI
 */
class ApisearchUI {
    constructor(api) {
        this.api = api;
        this.widgets = WidgetFactory;
        this.activeWidgets = [];

        api.search(
            api.query.create(''),
            res => {
                store.dispatch({
                    type: 'SEARCH_KEY_UP',
                    payload: res.query.q
                });
            }
        );

        // Subscribe current store for any change
        store.subscribe(
            () => this.reloadComponents()
        );
    }

    addWidget(widget) {
        this.activeWidgets = [
            ...this.activeWidgets,
            widget
        ];
        return this;
    }

    addWidgets(...widgets) {
        widgets.map(widget => this.addWidget(widget));
        return this;
    }

    init() {
        this.activeWidgets.map(widget => {
            render(
                widget,
                document.querySelector('.search-input')
            )
        })
    }

    reloadComponents() {
        this.activeWidgets.map(widget => {
            widget.render();
        })
    }
}

/**
 * Apisearch Entry Point
 *
 * @param apiKey
 * @returns {ApisearchUI}
 */
module.exports = function(apiKey) {
    const api = apisearch(apiKey);

    return new ApisearchUI(api);
};