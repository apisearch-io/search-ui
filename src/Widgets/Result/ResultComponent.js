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
            itemsPerPage,
            currentQuery
        } = this.props;

        changeItemsPerResultPageSetup(
            itemsPerPage,
            currentQuery
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