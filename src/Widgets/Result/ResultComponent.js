/**
 * @jsx h
 */

import { h, Component } from 'preact';
import Template from "../Template";

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
                container: containerClassName
            },
            template: {
                itemsList: bodyTemplate,
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
            items: data ? data.items : []
        };

        let formattedTemplateData = formatData(reducedTemplateData);

        return (
            <div className={`as-result ${containerClassName}`}>
                {(placeholderTemplate && dirty)
                    ? <Template
                        template={placeholderTemplate}
                        className={`as-result__placeholder`}
                    />
                    : <Template
                        template={bodyTemplate}
                        data={formattedTemplateData}
                        className={`as-result__itemsList`}
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
        container: ''
    },
    template: {
        placeholder: null
    },
    formatData: data => data
};

export default ResultComponent;