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
    constructor() {
        super();
        this.state = {
            isInitialState: true
        }
    }

    componentWillMount() {
        /**
         * Define initial Setup on component mounting
         * that refers to the store configuration
         * and affects other widgets
         */

        const {
            itemsPerPage,
            highlightsEnabled,
            currentQuery
        } = this.props;

        changeItemsPerResultPageSetup(
            {
                itemsPerPage,
                highlightsEnabled
            },
            currentQuery
        )
    }

    componentWillReceiveProps() {
        this.setState({
            isInitialState: false
        })
    }

    render() {
        const {
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
            items: data ? data.items : []
        }

        return (
            <div className={`asui-result ${containerClassName}`}>
                {(placeholderTemplate && this.state.isInitialState)
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
    enableHighlights: false,
    classNames: {
        container: ''
    },
    template: {
        placeholder: null
    }
};

export default ResultComponent;