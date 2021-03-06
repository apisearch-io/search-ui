import {Repository} from "apisearch";
import Store from "../Store";

/**
 * Widget
 */
export default abstract class Widget {

    protected target;
    protected component: any;

    /**
     * @param environmentId
     * @param store
     * @param repository
     * @param dictionary
     */
    public abstract render(
        environmentId: string,
        store: Store,
        repository: Repository,
        dictionary: { [key: string]: string; }
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
