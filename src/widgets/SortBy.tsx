import { h, render } from 'preact';
import SortByComponent from "../components/SortBy/SortByComponent";
import {Repository, SortBy as ApisearchSortBy} from "apisearch";
import Widget from "./Widget";
import Store from "../Store";

/**
 * SortBy
 */
class SortBy extends Widget {

    private targetNode: any;

    constructor({
        target,
        classNames,
        options
    }) {
        super();
        this.target = target;
        this.targetNode = document.querySelector(this.target);
        this.component = <SortByComponent
            target={target}
            classNames={{
                ...SortByComponent.defaultProps.classNames,
                ...classNames
            }}
            options={options}
        />
    }

    /**
     * Widget
     *
     * @param environmentId
     * @param store
     * @param repository
     */
    render(
        environmentId:string,
        store:Store,
        repository:Repository
    ){
        this.component.props = {
            ...this.component.props,
            environmentId: environmentId,
            repository: repository,
            dirty: store.isDirty(),
            currentResult: store.getCurrentResult(),
            currentQuery: store.getCurrentQuery(),
        };

        render(
            this.component,
            this.targetNode
        )
    }

    /**
     * @param query
     * @param object
     */
    public toUrlObject(
        query: any,
        object: any
    )
    {
        if (
            query.sort !== undefined
        ) {
            const sort = query.sort[0];
            const sortInstance = ApisearchSortBy.createFromArray(query.sort);
            const sortAsString = sortInstance.getFirstSortAsString();
            const firstSortAsString = this.component.props.options[0].value

            if (sortAsString !== firstSortAsString) {
               if (sort.type == 'distance') {
                    object.sort = 'distance:' + sort.unit + ':' + sort.coordinate.lat + ':' + sort.coordinate.lon;
                } else {
                    object.sort = sort.field.substr(17) + ':' + sort.order;
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
        query: any
    )
    {
        if (object.sort !== undefined) {
            if (query.sort == undefined) {
                query.sort = [{}];
            }

            if (object.sort === 'score') {
                query.sort[0].field = '_score';
                query.sort[0].order = 'desc';
                return;
            }

            if (object.sort.indexOf('distance:') === 0) {
                const distanceSortParts = object.sort.split(':');
                query.sort[0].type = distanceSortParts[0];
                query.sort[0].unit = distanceSortParts[1];
                query.sort[0].coordinate = {
                    'lat': distanceSortParts[2],
                    'lon': distanceSortParts[3],
                };

                return;
            }

            const sortParts = object.sort.split(':');
            query.sort[0].field = 'indexed_metadata.' + sortParts[0];
            query.sort[0].order = sortParts[1];
        }
    }
}

/**
 * SortBy widget
 *
 * @param settings
 */
export default settings => new SortBy(settings);
