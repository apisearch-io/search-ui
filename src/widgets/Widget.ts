import {Query, Repository} from "apisearch";
import Store from "../Store";

/**
 * Widget
 */
export default abstract class Widget {

    protected target;
    protected component: any;

    /**
     * Widget
     *
     * @param environmentId
     * @param store
     * @param repository
     */
    public abstract render(
        environmentId: string,
        store: Store,
        repository: Repository,
    );

    /**
     * @param query
     * @param object
     */
    public toUrlObject(
        query: any,
        object: any
    )
    {

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

    }
}
