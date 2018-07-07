import { h, Component } from 'preact';
import Template from "../Template";
import {InformationProps} from "./InformationProps";

/**
 * Result Information Component
 */
class InformationComponent extends Component<InformationProps> {
    render() {

        const props = this.props;
        const containerClassName = props.classNames.container;
        const containerTemplate = props.template.container;
        const formatData = props.formatData;
        const currentResult = props.currentResult;

        /**
         * Data accessible to the template
         */
        let reducedTemplateData = {
            total_hits: currentResult.getTotalHits().toLocaleString(),
            total_items: currentResult.getTotalItems().toLocaleString()
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
        container: 'Found {{total_hits}}/{{total_items}}'
    },
    formatData: data => data
};

export default InformationComponent;