/**
 * @jsx h
 */
import { h, Component } from 'preact';
import {onChangeSearchAction} from "./sortByActions";

/**
 * SortBy Filter Component
 */
class SortByComponent extends Component {
    constructor() {
        super();
    }

    shouldComponentUpdate() {
        return false;
    }

    handleChange = (e) => {
        onChangeSearchAction(
            e.target.value,
            this.props.currentQuery,
            this.props.client
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

export default SortByComponent;