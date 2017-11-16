import { h, render, createElement } from 'preact';

import { initialDataFetchAction } from "./apisearchActions";
import WidgetFactory from "../Factory/WidgetFactory";

/**
 * ApisearchUI class
 */
class ApisearchUI {
    /**
     * Constructor.
     */
    constructor(environmentId, client, store) {
        /**
         * Environment Id
         */
        this.environmentId = environmentId;

        /**
         * UI related properties
         */
        this.client = client;
        this.widgets = WidgetFactory;
        this.activeWidgets = [];

        /**
         * Store related properties
         */
        this.store = store;
    }

    /**
     * Initialize components
     */
    init() {
        /**
         * 1.- Register all events on the store
         */
        this.store.on('render', () => this.render());

        /**
         * 2.- Trigger the initial render: (Mount the components)
         *     To let components setup its configuration on componentWillMount()
         */
        this.render();

        /**
         * 3.- Dispatch the initial data request
         *     With all widget previous initial configurations
         */
        initialDataFetchAction(
            this.environmentId,
            this.store.currentQuery,
            this.client
        );
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
            let hydratedWidget = hydrateWidget(
                this.environmentId,
                this.store,
                this.client,
                widget
            );
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
    }
}

function hydrateWidget(
    environmentId,
    currentStore,
    client,
    widget
) {
    /**
     * Pass ApisearchClient, current Query, and data received
     * as a component attributes. There will be accessible
     * on component props.
     */
    widget.attributes.environmentId = environmentId;
    widget.attributes.dirty = currentStore.dirty;
    widget.attributes.data = currentStore.data;
    widget.attributes.currentQuery = currentStore.currentQuery;
    widget.attributes.client = client;

    return widget;
}

export default ApisearchUI;