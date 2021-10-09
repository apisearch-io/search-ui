import apisearch, {Query, Repository, Result} from "apisearch";
import {EventEmitter} from "events";
import {APISEARCH_DISPATCHER} from "./Constants";
import container from "./Container";

/**
 * Flux pattern store class
 */
class Store extends EventEmitter {

    private dirty: boolean;
    private readonly withHash: boolean = false;
    private readonly urlHash: string;
    private currentQuery: Query;
    private currentResult: Result;
    private currentVisibleResults: boolean;
    private readonly window: Window;
    private readonly isUnderIframe: boolean;

    /**
     * @param coordinate
     * @param minScore
     * @param hash
     * @param userId
     * @param generateRandomSessionUUID
     */
    constructor(
        coordinate: {
            lat: number,
            lon: number,
        },
        minScore: number,
        hash: string,
        userId: string,
        generateRandomSessionUUID: boolean,
    ) {
        super();

        this.dirty = true;
        const initialQuery = Store.loadInitialQuery(coordinate, userId);
        this.window = window.top;
        this.isUnderIframe = (window !== window.top);

        if ((typeof hash === "string")) {
            this.withHash = true;
            this.urlHash = (hash === "") ? "{}" : hash;
            if (this.urlHash.charAt(0) === "#") {
                this.urlHash = this.urlHash.substr(1);
            }
        }

        if (minScore) {
            initialQuery.setMinScore(minScore);
        }

        /**
         * Data received
         */
        this.setEmptyResult();
        this.currentVisibleResults = false;
        if (generateRandomSessionUUID) {
            initialQuery.setMetadataValue("session_uid", Store.createUID(16));
        }
        this.setCurrentQuery(initialQuery);
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
     * @param query
     */
    public setCurrentQuery(query: Query) {
        this.currentQuery = query;
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
     *
     */
    public setEmptyResult() {
        this.currentResult = apisearch.createEmptyResult();
    }

    /**
     * Get current result
     *
     * @return {boolean}
     */
    public hasProperResult(): boolean {
        return this.currentResult.getTotalItems() > 0;
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
    public updateApisearchSetup(payload: any) {
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
        this.currentVisibleResults = query !== undefined;

        this.replaceUrl(
            query,
            result,
            this.currentVisibleResults,
            false,
        );

        this.emit("render");
    }

    /**
     * @param payload
     */
    public renderFetchedData(payload: any) {
        const { result, query, visibleResults } = payload;

        this.dirty = false;
        this.currentResult = result;
        this.currentQuery = query;

        if (visibleResults !== undefined) {
            this.currentVisibleResults = visibleResults;
        }

        this.replaceUrl(
            query,
            result,
            visibleResults,
        );

        this.emit("render");
    }

    /**
     * Create an uid
     */
    public static createUID(length) {
       let result = "";
       const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
       const charactersLength = characters.length;
       for ( let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }

       return result;
    }

    /**
     * @param environmentId
     * @param repository
     * @param loadQuery
     */
    public fetchInitialQuery(
        environmentId: string,
        repository: Repository,
        loadQuery: boolean,
    ) {
        const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);
        this.currentQuery = loadQuery
            ? this.loadQuery(this.currentQuery)
            : this.currentQuery;

        /**
         * In initial query, we must delete user
         */
        const queryAsArray = this.currentQuery.toArray();
        queryAsArray.user = null;

        repository
            .query(Query.createFromArray(queryAsArray))
            .then((result) => {
                dispatcher.dispatch("RENDER_INITIAL_DATA", {
                    query: this.currentQuery,
                    result: result,
                });
            });
    }

    /**
     * @param coordinate
     * @param userId
     */
    private static loadInitialQuery(coordinate: {
        lat: number,
        lon: number,
    }, userId: string): Query {
        const withCoordinate = (
            coordinate &&
            coordinate.lat !== undefined &&
            coordinate.lon !== undefined
        );

        const q: any = {};
        if (withCoordinate) {
            q.coordinate = coordinate;
        }

        if (userId !== "") {
            q.user = {id: userId};
        }

        return Query.createFromArray(q);
    }

    /**
     * @param query
     */
    private loadQuery(query: Query): Query {
        if (!this.withHash) {
            return query;
        }

        const urlObject = (
            this.urlHash !== undefined &&
            this.urlHash !== null &&
            this.urlHash !== "" &&
            this.urlHash !== "/"
        )
            ? JSON.parse(decodeURI(this.urlHash))
            : {};
        const queryAsObject = query.toArray();
        this.emit("fromUrlObject", urlObject, queryAsObject);

        return Query.createFromArray(queryAsObject);
    }

    /**
     *
     * @param query
     * @param result
     * @param visibleResults
     * @param isFirst
     */
    private replaceUrl(
        query: Query,
        result: Result,
        visibleResults: boolean|undefined,
        isFirst: boolean|undefined = null,
    ) {
        if (!this.withHash) {
            return;
        }

        const queryAsObject = query.toArray();
        const urlObject: any = {};
        this.emit("toUrlObject", queryAsObject, urlObject);
        let objectAsJson = decodeURI(JSON.stringify(urlObject));
        objectAsJson = (objectAsJson === "{}") ? "" : objectAsJson;

        if (!this.isUnderIframe) {

            const path = window.location.href;
            const pathWithoutHash = path.split("#", 2)[0];
            history.replaceState("", "", pathWithoutHash + "#" + objectAsJson);
            if (objectAsJson === "") {
                history.replaceState("", "", pathWithoutHash);
            }
        } else {
            this.window.postMessage({
                name: "apisearch_replace_hash",
                hash: objectAsJson,
            }, "*");
        }
    }
}

export default Store;
