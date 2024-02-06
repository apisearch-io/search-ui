import {Repository, SortBy as ApisearchSortBy} from "apisearch";
import {h, render} from "preact";
import SortByComponent from "../components/SortBy/SortByComponent";
import Store from "../Store";
import Widget from "./Widget";

/**
 * SortBy
 */
class SortBy extends Widget {

    private targetNode: any;

    constructor({
        target,
        classNames,
        options,
    }) {
        super();
        this.target = target;
        this.targetNode = document.querySelector(this.target);
        this.component = <SortByComponent
            target={target}
            classNames={{
                ...SortByComponent.defaultProps.classNames,
                ...classNames,
            }}
            options={options}
        />;
    }

    /**
     * @param environmentId
     * @param store
     * @param repository
     * @param dictionary
     */
    public render(
        environmentId: string,
        store: Store,
        repository: Repository,
        dictionary: { [key: string]: string; },
    ) {
        this.component.props = {
            ...this.component.props,
            environmentId,
            repository,
            store,
        };

        render(
            this.component,
            this.targetNode,
        );
    }

    /**
     * @private
     */
    private firstOptionAsString() {
        return this.component.props.options[0].value;
    }

    /**
     * @param query
     * @param object
     */
    public toUrlObject(
        query: any,
        object: any,
    ) {
        if (
            query.sort !== undefined
        ) {
            const sort = query.sort[0];
            const sortInstance = ApisearchSortBy.createFromArray(query.sort);
            const sortAsString = sortInstance.getFirstSortAsString();
            const firstSortAsString = this.firstOptionAsString();

            if (sortAsString !== firstSortAsString) {
               if (sort.type === "distance") {
                    object.sort = "distance:" + sort.unit + ":" + sort.coordinate.lat + ":" + sort.coordinate.lon;
                } else {
                    object.sort = sort.field.substr(17) + ":" + sort.order;
                }
            }
        }
    }

    /**
     * @param object
     * @param query
     */
    public fromUrlObject(
        object: any,
        query: any,
    ) {
        if (object.sort !== undefined) {
            SortBy.setSortToQuery(query, object.sort);
        }
    }

    /**
     * @param query
     */
    public reset(query: any) {
        delete query.sort;
        const firstSortAsString = this.firstOptionAsString();
        SortBy.setSortToQuery(query, firstSortAsString);
    }

    /**
     * @param query
     * @param option
     * @private
     */
    private static setSortToQuery(query, option) {

        if (option === "score") {
            return;
        }

        query.sort = [{}];

        if (option.indexOf("distance:") === 0) {
            const distanceSortParts = option.split(":");
            query.sort[0].type = distanceSortParts[0];
            query.sort[0].unit = distanceSortParts[1];
            query.sort[0].coordinate = {
                lat: distanceSortParts[2],
                lon: distanceSortParts[3],
            };

            return;
        }

        const sortParts = option.split(":");
        query.sort[0].type = "field";
        query.sort[0].field = "indexed_metadata." + sortParts[0];
        query.sort[0].order = sortParts[1];
    }
}

/**
 * SortBy widget
 *
 * @param settings
 */
export default (settings) => new SortBy(settings);
