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
            highlightsEnabled,
            currentQuery
        } = this.props;

        /**
         * Dispatch action
         */
        changeItemsPerResultPageSetup(
            {
                environmentId,
                itemsPerPage,
                highlightsEnabled
            },
            currentQuery
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
            data
        } = this.props;

        /**
         * Data accessible to the template
         */
        let reducedTemplateData = {
            query: data ? data.query.q : '',
            items: data ? data.items : []
        }

        return (
            <div className={`asui-result ${containerClassName}`}>
                {(placeholderTemplate && dirty)
                    ? <Template
                        template={placeholderTemplate}
                        className={`asui-result--placeholder`}
                    />
                    : <Template
                        template={bodyTemplate}
                        data={reducedTemplateData}
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
    classNames: {
        container: ''
    },
    template: {
        placeholder: null
    }
};

export default ResultComponent;