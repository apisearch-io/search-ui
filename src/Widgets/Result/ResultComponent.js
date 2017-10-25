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
                header: headerTemplate,
                body: bodyTemplate,
                footer: footerTemplate
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
            <div className={`asui-result ${containerClassName ? containerClassName : ''}`}>
                <Template
                    template={headerTemplate}
                    className={`asui-result-header`}
                />

                <Template
                    template={bodyTemplate}
                    data={reducedTemplateData}
                    className={`asui-result-body`}
                />

                <Template
                    template={footerTemplate}
                    className={`asui-result-footer`}
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
        header: null,
        footer: null
    }
};

export default ResultComponent;