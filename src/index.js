/**
 * @jsx h
 */

/**
 * Vendors
 */
import apisearch from 'apisearch';
import { h, render, createElement } from 'preact';

/**
 * Locals
 */
import WidgetFactory from "./Factory/WidgetFactory";
import {store} from "./ApisearchStore";


/**
 * Apisearch UI
 */
class ApisearchUI {
    constructor(api) {
        this.api = api;
        this.widgets = WidgetFactory;
        this.activeWidgets = [];
    }

    addWidget(widget) {
        this.activeWidgets = [...this.activeWidgets, widget];
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
                document.querySelector(
                    widget.attributes.target
                )
            )
        });
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