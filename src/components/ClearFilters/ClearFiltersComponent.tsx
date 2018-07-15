import { h, Component } from 'preact';
import Template from "../Template";
import {clearFiltersAction} from "./ClearFiltersActions";
import {ClearFiltersProps} from "./ClearFiltersProps";
import {ClearFiltersState} from "./ClearFiltersState";

/**
 * Result Information Component
 */
class ClearFiltersComponent extends Component<ClearFiltersProps, ClearFiltersState> {

    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = {showClearFilters: false}
    }

    /**
     * Component receive props
     *
     * @param props
     */
    componentWillReceiveProps(props) {
        let filters = props.currentQuery.getFilters();
        let areFiltersActive = (
            Object.keys(filters).length > 1
        );

        this.setState({showClearFilters: areFiltersActive});
    }

    /**
     * Handle click
     */
    handleClick = () => {

        const props = this.props;
        const environmentId = props.environmentId;
        const currentQuery = props.currentQuery;
        const repository = props.repository;

        this.setState({showClearFilters: false});

        /**
         * Dispatch a clear filter action
         */
        clearFiltersAction(
            environmentId,
            currentQuery,
            repository
        )
    };

    /**
     * Render
     *
     * @return {}
     */
    render() {

        const props = this.props;
        const containerClassName = props.classNames.container;
        const containerTemplate = props.template.container;

        return (this.state.showClearFilters)
            ? ( <div className={`as-clearFilters ${containerClassName}`}
                     onClick={this.handleClick}
                >
                    <Template template={containerTemplate} />
                </div>
            ) : null
    }
}

ClearFiltersComponent.defaultProps = {
    classNames: {
        container: ''
    },
    template: {
        container: 'Clear filters'
    }
};

export default ClearFiltersComponent;