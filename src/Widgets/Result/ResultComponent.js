/**
 * @jsx h
 */

import { h, Component } from 'preact';
import Template from "../Template";

/**
 * Result Component
 */
class ResultComponent extends Component {

    render() {
        const {
            classNames: {
                container: containerClassName
            },
            template: {
                top: topTemplate,
                body: bodyTemplate,
                bottom: bottomTemplate
            },
            data
        } = this.props;

        /**
         * Data accessible to the template
         */
        let reducedTemplateData = {
            items: data.items
        }

        return (
            <div className={`asui-result ${containerClassName}`}>
                <Template
                    template={topTemplate}
                    className={`asui-result--header`}
                />
                <Template
                    template={bodyTemplate}
                    data={reducedTemplateData}
                    className={`asui-result--body`}
                />
                <Template
                    template={bottomTemplate}
                    className={`asui-result--footer`}
                />
            </div>
        )
    }
}

ResultComponent.defaultProps = {
    classNames: {
        container: ''
    },
    template: {
        top: null,
        bottom: null
    }
};

export default ResultComponent;