import {Component, h} from 'preact';
import {highlightElement} from "../../Highlight";
import {SuggestionsFilterProps} from "./SuggestionsFilterProps";
import {SuggestionsFilterState} from "./SuggestionsFilterState";
import {defaultItemTemplate, defaultItemWithCategoryTemplate} from "./defaultTemplates";
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
            props.firstSuggestionCategories,
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
     * @param categoryField
     * @param categoryValue
     */
    handleClick = (
        word,
        categoryField = null,
        categoryValue = null,
    ) => {

        const props = this.props;
        if (typeof word ===  "string") {
            word = word
                .replace(/<em>/g, "")
                .replace(/<\/em>/g, "");
        }

        window.postMessage({
            name: "apisearch_suggestion_clicked",
            word: word,
            category_field: categoryField,
            category_value: categoryValue,
        }, "*");
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
        const itemWithCategoryTemplate = props.template.itemWithCategory;
        const that = this;
        const firstSuggestionCategories = props.store.getCurrentResult().getMetadataValue("first_suggestion_categories") ?? [];
        const firstSuggestionCategoryField = props.store.getCurrentResult().getMetadataValue("first_suggestion_categories_field") ?? [];
        const hasCategories = firstSuggestionCategories.length > 0;

        return (
            <div className={`as-suggestions ${containerClassName} ${noSuggestionsClassName}`}>
                <Template
                    template={topTemplate}
                    className={`as-suggestions__top ${topClassName}`}
                    dictionary={this.props.dictionary}
                />

                <div className={`as-suggestions__itemsList ${itemsListClassName}`}>
                    {state.words.map((word, index) => {
                        const shouldPrintCategories = hasCategories && (index === 0);
                        const templateData = {word};

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

                                {(shouldPrintCategories)
                                    ? (
                                        <div className={`as-suggestedSearch__itemCategories`}>
                                            {firstSuggestionCategories.map((category) => {
                                                return (
                                                    <div
                                                        className={`as-suggestions__itemCategory`}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            e.preventDefault();
                                                            that.handleClick(word, firstSuggestionCategoryField, category.value);
                                                        }}
                                                    >
                                                        <Template
                                                            template={itemWithCategoryTemplate}
                                                            data={category}
                                                            dictionary={this.props.dictionary}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )
                                    : ""
                                }
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

SuggestionsFilterComponent.defaultProps = {
    first_suggestion_categories: false,
    classNames: {
        container: '',
        top: '',
        itemsList: '',
        item: '',
    },
    template: {
        top: null,
        item: defaultItemTemplate,
        itemWithCategory: defaultItemWithCategoryTemplate,
    },
}

export default SuggestionsFilterComponent;
