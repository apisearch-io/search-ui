import { h, render } from 'preact';
import ReloadComponent from "../components/Reload/ReloadComponent";
import Widget from "./Widget";
import {Repository} from "apisearch";
import Store from "../Store";

/**
 * Reload
 */
class Reload extends Widget {

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
        this.component = <ReloadComponent
            target={target}
            classNames={{
                ...ReloadComponent.defaultProps.classNames,
                ...classNames
            }}
            template={template}
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
            dictionary: dictionary,
        };

        let targetNode = document.querySelector(this.target);

        render(
            this.component,
            targetNode
        )
    }
}

/**
 * Reload filter
 *
 * @param settings
 */
export default settings => new Reload(settings);
