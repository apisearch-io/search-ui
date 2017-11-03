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
            total_hits: parseInt(data.total_hits).toLocaleString('de-DE'),
            total_items: parseInt(data.total_items).toLocaleString('de-DE')
        };

        return (
            <Template
                template={containerTemplate}
                data={reducedTemplateData}
                className={`asui-information ${containerClassName}`}
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