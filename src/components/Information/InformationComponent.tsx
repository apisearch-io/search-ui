import { h, Component } from 'preact';
import Template from "../Template";
import {InformationProps} from "./InformationProps";
import {InformationState} from "./InformationState";

/**
 * Result Information Component
 */
class InformationComponent extends Component<InformationProps, InformationState> {

    /**
     * Constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            hits: 0,
            total: 0
        }
    }

    /**
     * Component will receive props
     *
     * @param props
     */
    componentWillReceiveProps(props) {

        this.setState(prevState => {
            return {
               hits: props.currentResult.getTotalHits(),
               total: props.currentResult.getTotalItems()
           };
        });
    }


    render() {

        const props = this.props;
        const containerClassName = props.classNames.container;
        const containerTemplate = props.template.container;
        const formatData = props.formatData;
        const currentResult = props.currentResult;

        if (props.currentResult == null) {
            return;
        }

        /**
         * Data accessible to the template
         */
        let reducedTemplateData = {
            total_hits: this.state.hits.toLocaleString(),
            total_items: this.state.total.toLocaleString()
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
