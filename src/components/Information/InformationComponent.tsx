import {Component, h} from 'preact';
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
            return (props.store.getCurrentResult() == null)
                ? {
                    hits: 0,
                    total: 0,
                    visible: false
                }
                : {
                    hits: props.store.getCurrentResult().getTotalHits(),
                    total: props.store.getCurrentResult().getTotalItems(),
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

        const currentQuery = this.props.store.getCurrentQuery();
        const size = currentQuery.getSize();
        const page = currentQuery.getPage();
        const from = (page-1)*size;
        const to = from + size;
        let totalHits = this.state.hits.toLocaleString();
        let moreThanLimit = false;
        if (totalHits === "10,000" || totalHits === "10.000" || totalHits === "10000") {
            totalHits = "+10.000";
            moreThanLimit = true;
        }

        /**
         * Data accessible to the template
         */
        let reducedTemplateData = {
            total_hits: totalHits,
            total_items: this.state.total.toLocaleString(),
            page: page,
            size: size,
            from: from+1,
            to: to,
            more_than_limit: moreThanLimit,
        };

        let formattedTemplateData = formatData(reducedTemplateData);

        return (
            <Template
                template={containerTemplate}
                data={formattedTemplateData}
                className={`as-information ${containerClassName}`}
                dictionary={this.props.dictionary}
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
