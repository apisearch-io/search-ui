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
         * Define the items per result page
         */

        const {
            itemsPerPage,
            currentQuery,
            client
        } = this.props;

        changeItemsPerResultPageSetup(
            itemsPerPage,
            currentQuery,
            client
        )
    }

    render() {
        const {
            classNames: {
                container: containerClassName
            },
            template: {
                itemsList: bodyTemplate
            },
            data
        } = this.props;

        /**
         * Data accessible to the template
         */
        let reducedTemplateData = {
            items: data ? data.items : []
        }

        return (
            <div className={`asui-result ${containerClassName}`}>
                {
                 /**
                  * @todo: add initial message template
                  */
                }
                <Template
                    template={bodyTemplate}
                    data={reducedTemplateData}
                    className={`asui-result--itemsList`}
                />
            </div>
        )
    }
}

ResultComponent.defaultProps = {
    itemsPerPage: 10,
    classNames: {
        container: ''
    }
};

export default ResultComponent;