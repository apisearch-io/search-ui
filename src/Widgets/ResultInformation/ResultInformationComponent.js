/**
 * @jsx h
 */
import { h, Component } from 'preact';
import Template from "../Template";

/**
 * Result Information Component
 */
class ResultInformationComponent extends Component {
    render() {
        const {
            classNames: {
                container: containerClassName
            },
            template: {
                body: bodyTemplate
            },
            data
        } = this.props;

        /**
         * Data accessible to the template
         */
        let reducedTemplateData = {
            total_hits: data.total_hits,
            total_items: data.total_items
        };

        return (
            <div className={`asui-resultInformation ${containerClassName}`}>
                <Template
                    template={bodyTemplate}
                    data={reducedTemplateData}
                    className={`asui-resultInformation-body`}
                />
            </div>
        )
    }
}

ResultInformationComponent.defaultProps = {
    classNames: {
        container: ''
    }
};

export default ResultInformationComponent;