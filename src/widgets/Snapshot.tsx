import {Repository} from "apisearch";
import {h, render} from "preact";
import SnapshotComponent from "../components/Snapshot/SnapshotComponent";
import Store from "../Store";
import Widget from "./Widget";

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
            store: store,
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
