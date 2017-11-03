import { h, render, createElement } from 'preact';

import { EventEmitter } from "events";
import WidgetFactory from "./Factory/WidgetFactory";

/**
 * ApisearchUI class
 */
class ApisearchUI extends EventEmitter {
    constructor(client) {
        super();

        /**
         * UI related properties
         */
        this.client = client;
        this.widgets = WidgetFactory;
        this.activeWidgets = [];

        /**
         * Store related properties
         */
        this.currentQuery = client.query.create('');
        this.data = {
            query: {
                q: ''
            },
            aggregations: {
                total_elements: 0
            },
            items: [],
            total_hits: 0,
            total_items: 0
        }
    }

    /**
     * Add new widget
     */
    addWidget(widget) {
        this.activeWidgets = [...this.activeWidgets, widget];
        return this;
    }

    /**
     * Add widgets in bulk mode
     */
    addWidgets(...widgets) {
        widgets.map(widget => this.addWidget(widget));
        return this;
    }

    /**
     * Initialize components
     */
    init() {
        // initial rendering + initial widget state
        this.activeWidgets.map(widget => {
            let hydratedWidget = hydrateWidget(this, widget);
            let targetNode = document.querySelector(widget.attributes.target);

            if (null === targetNode) {
                throw new Error(
                    `Widget (${hydratedWidget.nodeName.name}) must have a valid DOM target`
                )
            }

            render(
                hydratedWidget,
                targetNode,
                targetNode.lastChild
            )
        });

        // rendering on store changes
        this.on('change', () =>
            this.activeWidgets.map(widget => {
                let hydratedWidget = hydrateWidget(this, widget);
                let targetNode = document.querySelector(widget.attributes.target);

                render(
                    hydratedWidget,
                    targetNode,
                    targetNode.lastChild
                )
            })
        )
    }

    handleActions(action) {
        /**
         * this is what we call a reducer
         * on a redux architecture
         */
        const {
            result,
            updatedQuery
        } = action.payload;

        if (action.type === 'FETCH_DATA') {
            this.data = result;
            this.currentQuery = updatedQuery
        }

        this.emit('change');
    }
}

function hydrateWidget(currentStore, widget) {
    /**
     * Pass ApisearchClient, current Query, and data received
     * as a component attributes. There will be accessible
     * on component props.
     */
    widget.attributes.data = currentStore.data;
    widget.attributes.client = currentStore.client;
    widget.attributes.currentQuery = currentStore.currentQuery;

    return widget;
}

export default ApisearchUI;