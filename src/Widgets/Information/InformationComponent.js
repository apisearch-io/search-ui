/**
 * @jsx h
 */
import { h, Component } from 'preact';
import Template from "../Template";

/**
 * Result Information Component
 */
class InformationComponent extends Component {
    render() {
        const {
            classNames: {
                container: containerClassName
            },
            template: {
                container: containerTemplate
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
            <Template
                template={containerTemplate}
                data={reducedTemplateData}
                className={`asui-resultInformation ${containerClassName}`}
            />
        )
    }
}

InformationComponent.defaultProps = {
    classNames: {
        container: ''
    }
};

export default InformationComponent;