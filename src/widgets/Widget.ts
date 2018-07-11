import {Repository} from "apisearch";
import Store from "../Store";

/**
 * Widget
 */
export default abstract class Widget {

    protected target;
    protected component:any;

    /**
     * Widget
     *
     * @param environmentId
     * @param store
     * @param repository
     */
    abstract render(
        environmentId:string,
        store:Store,
        repository:Repository
    );
}