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


/**
 * Apisearch UI
 */
class ApisearchUI {
    constructor(client) {
        this.client = client;
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
            // pass apisearchClient as an component attribute
            // this will be accessible on component props.
            widget.attributes.client = this.client;

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
    const apisearchClient = apisearch(apiKey);

    return new ApisearchUI(apisearchClient);
};