import { h, render } from 'preact';
import InformationComponent from "../components/Information/InformationComponent";
import Widget from "./Widget";
import {Repository} from "apisearch";
import Store from "../Store";

/**
 * Information
 */
class Information extends Widget {

    /**
     * Constructor
     *
     * @param target
     * @param classNames
     * @param template
     * @param formatData
     */
    constructor({
        target,
        classNames,
        template,
        formatData
    }) {
        super();
        this.target = target;
        this.component = <InformationComponent
            target={target}
            classNames={{
                ...InformationComponent.defaultProps.classNames,
                ...classNames
            }}
            template={{
                ...InformationComponent.defaultProps.template,
                ...template
            }}
            formatData={formatData}
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
 * Information widget
 *
 * @param settings
 */
export default settings => new Information(settings);
