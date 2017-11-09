import { h, render, createElement } from 'preact';

import { EventEmitter } from "events";
import WidgetFactory from "./Factory/WidgetFactory";
import dispatcher from "./dispatcher";
import {initialDataFetchAction} from "./apisearchActions";

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
     * Initialize components
     */
    init() {
        /**
         * Register all events
         */
        this.on('render', () => this.render());

        /**
         * Trigger the initial render: (Mount the components)
         *   -> To let components setup its configuration on componentWillMount()
         *   -> And fetch the initial data with the given configuration
         */
        this.render();
        initialDataFetchAction(this.currentQuery, this.client);
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
     * Render.
     *
     * Loop all active widgets
     * Hydrate them with new props
     * And render them.
     */
    render() {
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

        console.log('Render!')
    }

    /**
     * Handle Dispatched actions
     *
     * This is what we call a reducer
     * on a Redux architecture
     */
    handleActions(action) {
        /**
         * When action only sets up store definitions
         * Does not dispatch any event
         */
        if (action.type === 'UPDATE_APISEARCH_SETUP') {
            this.currentQuery = action.payload.updatedQuery;
        }

        /**
         * When action triggers a re-rendering
         * Dispatches a 'render' event
         */
        if (action.type === 'RENDER_FETCHED_DATA') {
            const {
                result,
                updatedQuery
            } = action.payload;

            this.data = result;
            this.currentQuery = updatedQuery;

            this.emit('render');
        }
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