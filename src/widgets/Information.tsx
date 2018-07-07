import { h, render } from 'preact';
import InformationComponent from "../components/Information/InformationComponent";
import Widget from "./Widget";
import {Repository} from "apisearch";
import Store from "../Store";

/**
 * Information
 */
class Information extends Widget {

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
        this.component.attributes = {
            ...this.component.attributes,
            environmentId: environmentId,
            repository: repository,
            dirty: store.isDirty(),
            currentResult: store.getCurrentResult(),
            currentQuery: store.getCurrentQuery(),
        };

        let targetNode = document.querySelector(this.target);

        render(
            this.component,
            targetNode,
            targetNode.lastChild
        )
    }
}

/**
 * Information widget
 *
 * @param settings
 */
export const information = settings => new Information(settings);