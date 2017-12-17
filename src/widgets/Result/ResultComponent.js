/**
 * @jsx h
 */

import { h, Component } from 'preact';
import Template from "../Template";
import {defaultItemsListTemplate} from "./defaultTemplates";

/**
 * Actions
 */
import {changeItemsPerResultPageSetup} from "./resultActions";

/**
 * Result Component
 */
class ResultComponent extends Component {
    componentWillMount() {
        /**
         * Define initial Setup on component mounting
         * that refers to the store configuration
         * and affects other widgets
         */

        const {
            environmentId,
            itemsPerPage,
            promote,
            exclude,
            highlightsEnabled,
            currentQuery,
            client
        } = this.props;

        /**
         * Dispatch action
         */
        changeItemsPerResultPageSetup(
            {
                itemsPerPage,
                highlightsEnabled,
                promotedUUIDs: promote,
                excludedUUIDs: exclude
            },
            {
                environmentId,
                currentQuery,
                client
            }
        )
    }

    render() {
        const {
            dirty,
            classNames: {
                container: containerClassName,
                itemsList: itemsListClassName,
                placeholder: placeholderClassName
            },
            template: {
                itemsList: itemsListTemplate,
                placeholder: placeholderTemplate
            },
            formatData,
            data
        } = this.props;

        /**
         * Data accessible to the template
         */
        let reducedTemplateData = {
            query: data ? data.query.q : '',
            items: data.items ? data.items : []
        };

        /**
         * Format each item data
         */
        let formattedTemplateData = {
            ...reducedTemplateData,
            items: reducedTemplateData
                .items
                .map(item => formatData(item))
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