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
            currentQuery
        } = this.props;

        console.log(promote)

        /**
         * Dispatch action
         */
        changeItemsPerResultPageSetup(
            {   // queryOptions
                itemsPerPage,
                highlightsEnabled,
                promotedUUIDs: promote,
                excludedUUIDs: exclude
            },
            {   // appOptions
                environmentId,
                currentQuery
            }
        )
    }

    render() {
        const {
            dirty,
            showInitialResults,
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
        }

        let formattedTemplateData = formatData(reducedTemplateData);

        return (
            <div className={`asui-result ${containerClassName}`}>
                {(placeholderTemplate && dirty)
                    ? <Template
                        template={placeholderTemplate}
                        className={`asui-result--placeholder`}
                    />
                    : <Template
                        template={bodyTemplate}
                        data={formattedTemplateData}
                        className={`asui-result--itemsList`}
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