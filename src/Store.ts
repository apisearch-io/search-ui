import { EventEmitter } from "events";
import apisearch from 'apisearch';
import {Query} from 'apisearch';
import {Result} from 'apisearch';

/**
 * Flux pattern store class
 */
class Store extends EventEmitter {

    private dirty;
    private currentQuery:Query;
    private currentResult:Result;

    /**
     * Constructor
     */
    constructor() {
        super();

        /**
         * Store initial state
         */
        this.dirty = true;

        /**
         * Current query instance
         */
        this.currentQuery = apisearch.createQueryMatchAll();

        /**
         * Data received
         */
        this.currentResult = apisearch.createEmptyResult();
    }

    /**
     * Is dirty
     *
     * @return {any}
     */
    isDirty():boolean {
        return this.dirty;
    }

    /**
     * Get current query
     *
     * @return {Query}
     */
    getCurrentQuery():Query {
        return this.currentQuery;
    }

    /**
     * Get current result
     *
     * @return {Result}
     */
    getCurrentResult():Result {
        return this.currentResult;
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
            this.currentQuery = action.payload.query;
        }

        /**
         * Is triggered when a initial data is received
         * Dispatches an 'render' event
         */
        if (action.type === 'RENDER_INITIAL_DATA') {
            const { result, query } = action.payload;

            this.currentResult = result;
            this.currentQuery = query;

            this.emit('render');
        }

        /**
         * When action triggers a re-rendering
         * Dispatches a 'render' event
         */
        if (action.type === 'RENDER_FETCHED_DATA') {
            const { result, query } = action.payload;

            this.dirty = false;
            this.currentResult = result;
            this.currentQuery = query;

            this.emit('render');
        }
    }
}

export default Store;