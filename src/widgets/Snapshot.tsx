import { h, render } from 'preact';
import Widget from "./Widget";
import {Repository} from "apisearch";
import Store from "../Store";
import SnapshotComponent from "../components/Snapshot/SnapshotComponent";

/**
 * Snapshot
 */
class Snapshot extends Widget {

    /**
     * Constructor
     *
     * @param target
     * @param classNames
     * @param template
     */
    constructor({
        target,
        classNames,
        template
    }) {
        super();
        this.target = target;
        this.component = <SnapshotComponent
            target={target}
        />
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
        dictionary: { [key: string]: string; }
    ) {
        this.component.props = {
            ...this.component.props,
            environmentId: environmentId,
            repository: repository,
            dirty: store.isDirty(),
            currentResult: store.getCurrentResult(),
            currentQuery: store.getCurrentQuery(),
        };

        let targetNode = document.querySelector(this.target);

        render(
            this.component,
            targetNode
        )
    }
}

/**
 * @param settings
 */
export default settings => new Snapshot(settings);
