import {Component, h} from "preact";
import {initialSortBySetup, onChangeSearchAction} from "./SortByActions";
import {SortByProps} from "./SortByProps";
import {SortByState} from "./SortByState";

/**
 * SortBy Filter Component
 */
class SortByComponent extends Component<SortByProps, SortByState> {

    /**
     * Components will mount
     */
    public componentWillMount() {

        const props = this.props;
        const environmentId = props.environmentId;
        const options = props.options;
        const currentQuery = props.store.getCurrentQuery();
        const currentOption = options[0].value;

        this.setState({
            value: currentOption,
            visible: false,
        });

        /**
         * Dispatch action
         */
        initialSortBySetup(
            environmentId,
            currentQuery,
            currentOption,
        );
    }

    /**
     * Component will receive props
     *
     * @param props
     */
    public componentWillReceiveProps(props) {

        const nextFirstSortAsString = props.store.getCurrentQuery().getSortBy().getFirstSortAsString();
        const nextVisible = (props.store.getCurrentResult() != null)
            ? (props.store.getCurrentResult().getTotalHits() > 0)
            : false;

        if (
            this.state.value !== nextFirstSortAsString ||
            this.state.visible !== nextVisible
        ) {
            this.setState((prevState) => {
                return {
                    value: nextFirstSortAsString,
                    visible: nextVisible,
                };
            });
        }
    }

    /**
     * Handle change
     *
     * @param e
     */
    public handleChange = (e) => {

        const props = this.props;
        const environmentId = props.environmentId;
        const currentQuery = props.store.getCurrentQuery();
        const repository = props.repository;
        const currentOption = e.target.value;

        this.setState({
            value: currentOption,
        });

        /**
         * Dispatch action
         */
        onChangeSearchAction(
            environmentId,
            currentQuery,
            repository,
            currentOption,
        );
    }

    /**
     * Render
     *
     * @return {any}
     */
    public render(props, state) {

        const containerClassName = props.classNames.container;
        const selectClassName = props.classNames.select;

        if (!state.visible) {
            return;
        }

        let options = props.options;
        const coordinate = props.store.getCurrentQuery().toArray().coordinate;

        if (!coordinate) {
            options = options.filter((o) => {
                return o.value !== "distance";
            });
        }

        return (
            <div className={`as-sortBy ${containerClassName}`}>
                <select
                    className={`as-sortBy__selector ${selectClassName}`}
                    onChange={this.handleChange}
                    value={state.value}
                >
                    {options.map((option) => (
                        <option value={option.value}>{option.name}</option>
                    ))}
                </select>
            </div>
        );
    }
}

SortByComponent.defaultProps = {
    classNames: {
        container: "",
        select: "",
    },
};

export default SortByComponent;
