/**
 * @jsx h
 */

import { h, Component } from 'preact';
import Template from "../Template";
import {keyupSuggestedSearchAction} from "./suggestedSearchAction";
import {defaultTemplate} from "./suggestionBoxTemplate";

/**
 * Suggested Search Component
 */
class SuggestedSearchComponent extends Component {
    constructor() {
        super();
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch = (e) => {
        // Dispatch suggested search action
        keyupSuggestedSearchAction(
            e.target.value,
            this.props.currentQuery,
            this.props.client
        )
    };

    render() {
        const {
            placeholder,
            classNames: {
                container: containerClassName,
                input: inputClassName,
                box: boxClassName
            },
            template: {
                box: boxTemplate
            },
            data
        } = this.props;

        /**
         * Data accessible to the template
         */
        let reducedTemplateData = {
            suggests: data.suggests
        };

        return (
            <div className={`asui-suggestedSearch ${containerClassName}`}>
                <input
                    type={`text`}
                    className={`asui-suggestedSearch--input ${inputClassName}`}
                    placeholder={placeholder}
                    onKeyUp={this.handleSearch}
                />
                <Template
                    template={boxTemplate}
                    data={reducedTemplateData}
                    className={`asui-suggestedSearch--box ${boxClassName}`}
                />
            </div>
        )
    }
}

SuggestedSearchComponent.defaultProps = {
    placeholder: '',
    classNames: {
        container: '',
        input: '',
        box: ''
    },
    template: {
        box: null
    }
};

export default SuggestedSearchComponent;