/**
 * @jsx h
 */
import { h, Component } from 'preact';
import Template from "../Template";
import {clearFiltersAction} from "./clearFiltersActions";

/**
 * Result Information Component
 */
class ClearFiltersComponent extends Component {
    constructor() {
        super();
        this.state = {showClearFilters: false}
    }

    componentWillReceiveProps(props) {
        let filters = props.currentQuery.filters;
        let areFiltersActive = (
            Object.keys(filters).length !== 0 &&
            filters.length !== 0
        );

        this.setState({showClearFilters: areFiltersActive});
    }

    handleClick = () => {
        const {
            environmentId,
            currentQuery,
            client
        } = this.props;

        this.setState({showClearFilters: false});

        /**
         * Dispatch a clear filter action
         */
        clearFiltersAction(
            {},
            {
                environmentId,
                currentQuery,
                client
            }
        )
    };

    render() {
        const {
            classNames: {
                container: containerClassName
            },
            template: {
                container: containerTemplate
            }
        } = this.props;

        return (this.state.showClearFilters)
            ? ( <div className={`asui-clearFilters ${containerClassName}`}
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