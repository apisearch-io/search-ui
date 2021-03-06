import apisearch, {Repository} from "apisearch";
import {Query, Result} from "apisearch";
import {EventEmitter} from "events";
import {
    createHashHistory,
    createBrowserHistory,
    History,
    parsePath, createPath
} from "history";
import {isLocationState, LocationState} from "./LocationState";
import container from "./Container";
import {APISEARCH_DISPATCHER} from "./Constants";

/**
 * Flux pattern store class
 */
class Store extends EventEmitter {

    private dirty: boolean;
    private history: boolean|string;
    private currentQuery: Query;
    private currentResult: Result;
    private currentVisibleResults: boolean;
    private historyInstance: History;
    private historyPrefix: string = '';
    private fromBackHistoryState: boolean = false;

    /**
     * Constructor
     *
     * @param coordinate
     * @param minScore
     * @param history
     */
    constructor(
        coordinate: {
            lat: number,
            lon: number
        },
        minScore: number,
        history: boolean|string,
    ) {
        super();

        this.dirty = true;
        let initialQuery = Store.loadInitialQuery(coordinate)

        if (minScore) {
            initialQuery.setMinScore(minScore);
        }

        /**
         * Data received
         */
        this.currentResult = apisearch.createEmptyResult();
        this.currentVisibleResults = false;
        initialQuery.setMetadataValue('session_uid', Store.createUID(16));
        this.currentQuery = initialQuery;
        this.history = (history === true) ? 'hash' : history;
        if (!history) {
            return;
        }

        if (this.history === 'hash') {
            this.historyInstance = createHashHistory()
        } else {
            this.historyInstance = createBrowserHistory();
            this.historyPrefix = '?' + this.history + '=';
        }

        this.historyInstance.listen((event) => {
            if (
                event.action === 'POP' &&
                isLocationState(event.location.state)
            ) {
                this.fromBackHistoryState = true;
                this.renderFetchedData({
                    query: Query.createFromArray(event.location.state.query),
                    result: Result.createFromArray(event.location.state.result),
                    visibleResults: event.location.state.visibleResults
                })
            }
        })
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
     * @param payload
     */
    public updateApisearchSetup(payload: any)
    {
        this.currentQuery = payload.query;
    }

    /**
     * @param payload
     */
    public renderInitialData(payload: any)
    {
        const { result, query, _ } = payload;

        this.dirty = false;
        this.currentResult = result;
        this.currentQuery = query;
        this.currentVisibleResults = query != undefined;

        this.pushQueryToHistory(
            query,
            result,
            this.currentVisibleResults
        )

        this.emit("render");
    }

    /**
     * @param payload
     */
    public renderFetchedData(payload: any)
    {
        const { result, query, visibleResults } = payload;

        this.dirty = false;
        this.currentResult = result;
        this.currentQuery = query;

        if (visibleResults != undefined) {
            this.currentVisibleResults = visibleResults;
        }

        if (!this.fromBackHistoryState) {
            this.pushQueryToHistory(
                query,
                result,
                visibleResults
            )
        }
        this.fromBackHistoryState = false;

        this.emit("render");
    }

    /**
     * Create an uid
     */
    static createUID(length) {
       let result = '';
       const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
       const charactersLength = characters.length;
       for ( let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }

       return result;
    }

    /**
     * @param environmentId
     * @param repository
     */
    public fetchInitialQuery(
        environmentId: string,
        repository: Repository,
    ) {
        const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);
        this.currentQuery = this.loadQuery(this.currentQuery);

        repository
            .query(this.currentQuery)
            .then((result) => {
                dispatcher.dispatch("RENDER_INITIAL_DATA", {
                    query: this.currentQuery,
                    result: result,
                });
            });
    }

    /**
     * @param coordinate
     */
    private static loadInitialQuery(coordinate: {
        lat: number,
        lon: number
    }) : Query
    {
        const withCoordinate = (
            coordinate &&
            coordinate.lat != undefined &&
            coordinate.lon != undefined
        );

        const q:any = {};
        if (withCoordinate) {
            q.coordinate = coordinate;
        }

        return Query.createFromArray(q);
    }

    /**
     * @param query
     */
    private loadQuery(query: Query) : Query
    {
        if (typeof this.history !== "string") {
            return query;
        }

        let queryAsObject = query.toArray();
        const urlObject = this.loadUrlObjectFromHash();
        this.emit("fromUrlObject", urlObject, queryAsObject);

        return Query.createFromArray(queryAsObject);
    }

    /**
     * @private
     */
    private loadUrlObjectFromHash() : any
    {
        if (typeof this.history !== "string") {
            return {};
        }

        let urlHash = '';
        if (this.history === 'hash') {
            urlHash = window.location.hash.substr(1);
        } else {
            const urlParams = new URLSearchParams(window.location.search);
            urlHash = urlParams.get(this.history);
        }

        return (
            urlHash !== '' &&
            urlHash !== undefined &&
            urlHash !== null &&
            urlHash !== '' &&
            urlHash !== '/'
        )
            ? JSON.parse(decodeURI(urlHash))
            : {};
    }

    /**
     *
     * @param query
     * @param result
     * @param visibleResults
     */
    private pushQueryToHistory(
        query: Query,
        result: Result,
        visibleResults: boolean|undefined
    )
    {
        if (
            this.historyInstance === undefined ||
            (typeof this.history !== "string")
        ) {
            return;
        }

        let queryAsObject = query.toArray();
        const urlObject:any = {};
        this.emit("toUrlObject", queryAsObject, urlObject);

        const state: LocationState = {
            query: query.toArray(),
            result: result ? result.toArray() : null,
            visibleResults: visibleResults
        };

        const objectAsJson = decodeURI(JSON.stringify(urlObject));
        let path = '';

        if (this.history === 'hash') {
            path = objectAsJson;
        } else {
            let pathPieces = parsePath(window.location.href);
            const urlParams = new URLSearchParams(pathPieces.search);
            urlParams.set(this.history, objectAsJson);
            pathPieces.search = '?' + urlParams.toString();
            path = createPath(pathPieces);
        }

        this.historyInstance.push(path, state);
    }
}

export default Store;
