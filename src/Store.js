import { EventEmitter } from "events";


class Store extends EventEmitter {
    constructor(client) {
        super();

        /**
         * Store initial state
         */
        this.dirty = true;

        /**
         * Current query instance
         */
        this.currentQuery = client.query.create('');

        /**
         * Data received
         */
        this.data = {
            query: { q: '' },
            aggregations: { total_elements: 0 },
            items: [],
            total_hits: 0,
            total_items: 0
        }
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
         * Is triggered when a initial data is received
         * Dispatches an 'render' event
         */
        if (action.type === 'RENDER_INITIAL_DATA') {
            const { initialResult, initialQuery } = action.payload;

            this.data = initialResult;
            this.currentQuery = initialQuery;

            this.emit('render');
        }

        /**
         * When action triggers a re-rendering
         * Dispatches a 'render' event
         */
        if (action.type === 'RENDER_FETCHED_DATA') {
            const { result, updatedQuery } = action.payload;

            this.dirty = false;
            this.data = result;
            this.currentQuery = updatedQuery;

            this.emit('render');
        }
    }
}

export default Store;