import { h, Component } from 'preact';
import Template from "../Template";
import {defaultItemsListTemplate} from "./defaultTemplates";
import {configureQuery} from "./ResultActions";
import {ResultProps} from "./ResultProps";
import {ItemUUID} from "apisearch/lib/Model/ItemUUID";
import container from "../../Container";
import {
    APISEARCH_UI,
    APISEARCH_CONFIG,
} from "../../Constants";

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
        configureQuery(
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
            }),
            props.fields,
            props.filter
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
        const environmentId = props.environmentId;
        const config = container.get(`${APISEARCH_CONFIG}__${environmentId}`);
        const apisearchUI = container.get(`${APISEARCH_UI}__${environmentId}`);
        const apisearchReference = apisearchUI.reference;

        const itemsListTemplate = props.template.itemsList;
        const placeholderTemplate = props.template.placeholder;

        const formatData = props.formatData;
        const currentResult = props.currentResult;
        const currentQuery = props.currentQuery;
        const currentVisibleResults = props.currentVisibleResults;

        if (!currentVisibleResults) {
            return (
                <div className={`as-result ${containerClassName}`}></div>
            )
        }

        /**
         * Data accessible to the template
         */
        const items = currentResult.getItems();
        let reducedTemplateData = {
            query: currentQuery.getQueryText()
        };

        /**
         * Format each item data
         */
        let formattedTemplateData = {
            ...reducedTemplateData,
            items: (items)
                ? items.map(function(item) {
                    let appId = config.app_id;
                    const appUUID = item.getAppUUID();
                    if (typeof appUUID === "object") {
                        appId = appUUID.composedUUID();
                    }

                    let indexId = config.index_id;
                    const indexUUID = item.getIndexUUID();
                    if (typeof indexUUID === "object") {
                        indexId = indexUUID.composedUUID();
                    }

                    const itemId = item.getUUID().composedUUID();
                    const userId = config.user_id;
                    const clickParameters = typeof userId === "string"
                        ? appId+'", "'+indexId+'", "'+itemId+'", "'+userId
                        : appId+'", "'+indexId+'", "'+itemId;

                    return {
                        ...formatData(item),
                        ...{
                            'click': apisearchReference + '.click("'+clickParameters+'");'
                        }
                    }
                })
                : [],
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
    fields: [],
    itemsPerPage: 10,
    highlightsEnabled: false,
    promote: [],
    exclude: [],
    filter: function (query) {},
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
