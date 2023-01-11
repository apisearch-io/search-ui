import {Component, h} from 'preact';
import {highlightElement} from "../../Highlight";
import {onWordClickAction} from "../Common";
import {SuggestionsFilterProps} from "./SuggestionsFilterProps";
import {SuggestionsFilterState} from "./SuggestionsFilterState";
import {defaultItemTemplate} from "./defaultTemplates";
import {enableSuggestions} from "./SuggestionsFilterActions";
import Template from "../Template";

/**
 * Suggestion Filter Component
 */
class SuggestionsFilterComponent extends Component<SuggestionsFilterProps, SuggestionsFilterState> {

    public componentDidMount() {
        this.highlight();
    }

    public componentDidUpdate() {
        this.highlight();
    }

    public highlight() {
        const queryText = this.props.store.getCurrentQuery().getQueryText();
        if (queryText !== "") {
            const list = document.getElementsByClassName("as-suggestions");
            for (let i = 0; i < list.length; i++) {
                highlightElement(list[i], queryText);
            }
        }
    }

    /**
     * Component will mount
     */
    componentWillMount() {

        this.setState((prevState) => {
            return {
                words: [],
            };
        });

        const props = this.props;
        const environmentId = props.environmentId;
        const currentQuery = props.store.getCurrentQuery();

        /**
         * Dispatch action
         */
        enableSuggestions(
            environmentId,
            currentQuery,
            props.numberOfSuggestions,
        );
    }

    /**
     * Component will receive props
     *
     * @param props
     */
    componentWillReceiveProps(props) {

        this.setState((prevState) => {
            return {
                words: props
                    .store
                    .getCurrentResult()
                    .getSuggestions(),
            };
        });
    }

    /**
     * @param word
     */
    handleClick = (word) => {

        const props = this.props;
        if (typeof word ===  "string") {
            word = word
                .replace(/<em>/g, "")
                .replace(/<\/em>/g, "");
        }

        /**
         * Dispatch action
         */
        onWordClickAction(
            props.environmentId,
            props.store.getCurrentQuery(),
            props.repository,
            word,
        );
    }

    /**
     * Render
     *
     * @return {any}
     */
    render(props, state) {

        const containerClassName = props.classNames.container;
        const topClassName = props.classNames.top;
        const itemsListClassName = props.classNames.itemsList;
        const itemClassName = props.classNames.item;
        const noSuggestionsClassName = state.words.length > 0
            ? ""
            : "suggestions-empty";

        const topTemplate = props.template.top;
        const itemTemplate = props.template.item;
        const that = this;

        return (
            <div className={`as-suggestions ${containerClassName} ${noSuggestionsClassName}`}>
                <Template
                    template={topTemplate}
                    className={`as-suggestions__top ${topClassName}`}
                    dictionary={this.props.dictionary}
                />

                <div className={`as-suggestions__itemsList ${itemsListClassName}`}>
                    {state.words.map((word) => {
                        const templateData = {
                            word: word,
                        };

                        return (
                            <div
                                className={`as-suggestions__item ${itemClassName}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    that.handleClick(word);
                                }}
                            >
                                <Template
                                    template={itemTemplate}
                                    data={templateData}
                                    dictionary={this.props.dictionary}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

SuggestionsFilterComponent.defaultProps = {
    classNames: {
        container: "",
        top: "",
        itemsList: "",
        item: "",
    },
    template: {
        top: null,
        item: defaultItemTemplate,
    },
};

export default SuggestionsFilterComponent;
