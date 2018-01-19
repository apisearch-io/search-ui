import { h, render, createElement } from 'preact';

import { initialDataFetchAction } from "./apisearchActions";

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
        this.widgets = {};
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
     * Add components in bulk mode
     */
    addWidgets(...widgets) {
        widgets.map(widget => this.addWidget(widget));
        return this;
    }

    /**
     * Render.
     *
     * Loop all active components
     * Hydrate them with new props
     * And render them.
     */
    render() {
        this.activeWidgets.map(widget => {
            widget.render({
                environmentId: this.environmentId,
                store: this.store,
                client: this.client
            });
        });
    }
}

export default ApisearchUI;