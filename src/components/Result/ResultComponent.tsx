import { h, Component } from 'preact';
import Template from "../Template";
import {defaultItemsListTemplate} from "./defaultTemplates";
import {changeItemsPerResultPageSetup} from "./ResultActions";
import {ResultProps} from "./ResultProps";
import {ItemUUID} from "apisearch/lib/Model/ItemUUID";

/**
 * Result Component
 */
class ResultComponent extends Component<ResultProps> {

    /**
     * Component will mount
     */
    componentWillMount() {

        const props = this.props;

        /**
         * Dispatch action
         */
        changeItemsPerResultPageSetup(
            props.environmentId,
            props.currentQuery,
            props.itemsPerPage,
            props.highlightsEnabled,
            props.promote.map((itemUUID) => {
                return itemUUID instanceof ItemUUID
                    ? itemUUID
                    : ItemUUID.createFromArray(itemUUID)
            }),
            props.exclude.map((itemUUID) => {
                return itemUUID instanceof ItemUUID
                    ? itemUUID
                    : ItemUUID.createFromArray(itemUUID)
            })
        );
    }

    /**
     * Render
     *
     * @return {any}
     */
    render() {

        const props = this.props;
        const dirty = props.dirty;
        const containerClassName = props.classNames.container;
        const itemsListClassName = props.classNames.itemsList;
        const placeholderClassName = props.classNames.placeholder;

        const itemsListTemplate = props.template.itemsList;
        const placeholderTemplate = props.template.placeholder;

        const formatData = props.formatData;
        const currentResult = props.currentResult;
        const currentQuery = props.currentQuery;

        /**
         * Data accessible to the template
         */
        let reducedTemplateData = {
            query: currentQuery.getQueryText(),
            items: currentResult.getItems()
        };

        /**
         * Format each item data
         */
        let formattedTemplateData = {
            ...reducedTemplateData,
            items: (reducedTemplateData.items)
                ? reducedTemplateData
                   .items
                   .map(item => formatData(item))
                : []
        };

        return (
            <div className={`as-result ${containerClassName}`}>
                {(placeholderTemplate && dirty)
                    ? <Template
                        template={placeholderTemplate}
                        className={`as-result__placeholder ${placeholderClassName}`}
                    />
                    : <Template
                        template={itemsListTemplate}
                        data={formattedTemplateData}
                        className={`as-result__itemsList ${itemsListClassName}`}
                    />
                }
            </div>
        )
    }
}

ResultComponent.defaultProps = {
    itemsPerPage: 10,
    highlightsEnabled: false,
    promote: [],
    exclude: [],
    classNames: {
        container: '',
        itemsList: '',
        placeholder: ''
    },
    template: {
        itemsList: defaultItemsListTemplate,
        placeholder: null
    },
    formatData: data => data
};

export default ResultComponent;