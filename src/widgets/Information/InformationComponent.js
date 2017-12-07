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
            formatData,
            data
        } = this.props;

        /**
         * Data accessible to the template
         */
        let reducedTemplateData = {
            total_hits: parseInt(data.total_hits).toLocaleString('de-DE'),
            total_items: parseInt(data.total_items).toLocaleString('de-DE')
        };

        let formattedTemplateData = formatData(reducedTemplateData);

        return (
            <Template
                template={containerTemplate}
                data={formattedTemplateData}
                className={`as-information ${containerClassName}`}
            />
        )
    }
}

InformationComponent.defaultProps = {
    classNames: {
        container: ''
    },
    template: {
        container: 'Found {{total_hits}} of {{total_items}} items'
    },
    formatData: data => data
};

export default InformationComponent;