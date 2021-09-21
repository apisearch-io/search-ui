import {Repository} from "apisearch";
import {h, render} from 'preact';
import ResultComponent from "../components/Result/ResultComponent";
import Store from "../Store";
import Widget from "./Widget";

/**
 * Result
 */
class Result extends Widget {

    private targetNode: any;

    /**
     * Constructor
     *
     * @param target
     * @param fields
     * @param itemsPerPage
     * @param promote
     * @param exclude
     * @param filter
     * @param highlightsEnabled
     * @param classNames
     * @param template
     * @param formatData
     * @param fadeInSelector
     * @param infiniteScroll
     * @param fieldsConciliation
     * @param minScore
     */
    constructor({
        target,
        fields,
        itemsPerPage,
        promote,
        exclude,
        filter,
        highlightsEnabled,
        classNames,
        template,
        formatData,
        fadeInSelector,
        infiniteScroll,
        fieldsConciliation,
        minScore,
    }) {
        super();
        this.target = target;
        this.targetNode = document.querySelector(this.target);
        this.component = <ResultComponent
            target={target}
            fields={fields}
            itemsPerPage={itemsPerPage}
            promote={promote}
            exclude={exclude}
            filter={filter}
            highlightsEnabled={highlightsEnabled}
            classNames={{
                ...ResultComponent.defaultProps.classNames,
                ...classNames,
            }}
            template={{
                ...ResultComponent.defaultProps.template,
                ...template,
            }}
            formatData={formatData}
            fadeInSelector={fadeInSelector}
            infiniteScroll={infiniteScroll}
            fieldsConciliation={fieldsConciliation}
            minScore={minScore}
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
            currentVisibleResults: store.resultsAreVisible(),
            dictionary: dictionary,
        };

        render(
            this.component,
            this.targetNode
        )
    }
}

/**
 * Result widget
 *
 * @param settings
 */
export default settings => new Result(settings);
