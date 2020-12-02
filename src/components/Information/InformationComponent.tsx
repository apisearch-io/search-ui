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
            total: 0,
            visible: false
        }
    }

    /**
     * Component will receive props
     *
     * @param props
     */
    componentWillReceiveProps(props) {

        this.setState(prevState => {
            return (props.currentResult == null)
                ? {
                    hits: 0,
                    total: 0,
                    visible: false
                }
                : {
                    hits: props.currentResult.getTotalHits(),
                    total: props.currentResult.getTotalItems(),
                    visible: true
                };
        });
    }

    render() {

        const props = this.props;
        const containerClassName = props.classNames.container;
        const containerTemplate = props.template.container;
        const formatData = props.formatData;

        if (!this.state.visible) {
            return;
        }

        const currentQuery = this.props.currentQuery;
        const size = currentQuery.getSize();
        const page = currentQuery.getPage();
        const from = (page-1)*size;
        const to = from + size;

        /**
         * Data accessible to the template
         */
        let reducedTemplateData = {
            total_hits: this.state.hits.toLocaleString(),
            total_items: this.state.total.toLocaleString(),
            page: page,
            size: size,
            from: from+1,
            to: to
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
