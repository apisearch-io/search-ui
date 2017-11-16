/**
 * @jsx h
 */
import { h, Component } from 'preact';
import {onChangeSearchAction} from "./sortByActions";

/**
 * SortBy Filter Component
 */
class SortByComponent extends Component {
    shouldComponentUpdate() {
        return false;
    }

    handleChange = (e) => {
        const {
            environmentId,
            currentQuery,
            client
        } = this.props;

        /**
         * Dispatch action
         */
        onChangeSearchAction(
            {
                environmentId,
                selectedOption: e.target.value
            },
            currentQuery,
            client
        )
    };

    render() {
        const {
            classNames: {
                container: containerClassName,
                select: selectClassName
            },
            options
        } = this.props;

        return (
            <div className={`asui-sortBy ${containerClassName}`}>
                <select
                    className={`asui-sortBy--selector ${selectClassName}`}
                    onChange={this.handleChange}
                >
                    {options.map(option => (
                        <option value={option.value}>{option.name}</option>
                    ))}
                </select>
            </div>
        );
    }
}

SortByComponent.defaultProps = {
    classNames: {
        container: '',
        select: ''
    }
};

export default SortByComponent;