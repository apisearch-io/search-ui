import apisearch from "apisearch";
import {Query, Result, Coordinate, QUERY_DEFAULT_PAGE, QUERY_DEFAULT_SIZE} from "apisearch";
import { EventEmitter } from "events";

/**
 * Flux pattern store class
 */
class Store extends EventEmitter {

    private dirty: boolean;
    private currentQuery: Query;
    private currentResult: Result;
    private currentVisibleResults: boolean;
    private sessionUID: string;

    /**
     * Constructor
     *
     * @param coordinate
     * @param minScore
     */
    constructor(
        coordinate: {
            lat: number,
            lon: number
        },
        minScore: number
    ) {
        super();

        /**
         * Store initial state
         */
        this.dirty = true;

        /**
         * Current query instance
         */
        this.currentQuery = (
                coordinate &&
                coordinate.lat != undefined &&
                coordinate.lon != undefined
                )
            ? apisearch.createQueryLocated(new Coordinate(coordinate.lat, coordinate.lon), '', QUERY_DEFAULT_PAGE, QUERY_DEFAULT_SIZE)
            : apisearch.createQueryMatchAll();

        if (minScore) {
            this.currentQuery.setMinScore(minScore);
        }

        /**
         * Data received
         */
        this.currentResult = apisearch.createEmptyResult();
        this.currentVisibleResults = false;
        this.sessionUID = this.createUID(16);
        this.currentQuery.setMetadataValue('session_uid', this.sessionUID);
    }

    /**
     * Is dirty
     *
     * @return {any}
     */
    public isDirty(): boolean {
        return this.dirty;
    }

    /**
     * Get current query
     *
     * @return {Query}
     */
    public getCurrentQuery(): Query {
        return this.currentQuery;
    }

    /**
     * Get current result
     *
     * @return {Result}
     */
    public getCurrentResult(): Result {
        return this.currentResult;
    }

    /**
     * Results are visible
     *
     * @return {boolean}
     */
    public resultsAreVisible(): boolean {
        return this.currentVisibleResults;
    }

    /**
     * Handle Dispatched actions
     *
     * This is what we call a reducer
     * on a Redux architecture
     */
    public handleActions(action) {
        /**
         * When action only sets up store definitions
         * Does not dispatch any event
         */
        if (action.type === "UPDATE_APISEARCH_SETUP") {
            this.currentQuery = action.payload.query;

            return;
        }

        /**
         * Is triggered when a initial data is received
         * Dispatches an 'render' event
         */
        if (action.type === "RENDER_INITIAL_DATA") {
            const { result, query, visibleResults } = action.payload;

            this.currentResult = result;
            this.currentQuery = query;
            this.currentVisibleResults = query != undefined;

            this.emit("render");
            return;
        }

        /**
         * When action triggers a re-rendering
         * Dispatches a 'render' event
         */
        if (action.type === "RENDER_FETCHED_DATA") {
            const { result, query, visibleResults } = action.payload;

            this.dirty = false;
            this.currentResult = result;
            this.currentQuery = query;

            if (visibleResults != undefined) {
                this.currentVisibleResults = visibleResults;
            }

            this.emit("render");
            return;
        }
    }

    /**
     * Create an uid
     */
    public createUID(length) {
       var result = '';
       var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
       var charactersLength = characters.length;
       for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }

       return result;
    }
}

export default Store;
