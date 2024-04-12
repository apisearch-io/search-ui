import {Component, h} from 'preact';
import {highlightElement} from "../../Highlight";
import {dispatchQueryStringEvent, onWordClickAction} from "../Common";
import {SuggestionsFilterProps} from "./SuggestionsFilterProps";
import {SuggestionsFilterState} from "./SuggestionsFilterState";
import {defaultItemCategoryTemplate, defaultItemTemplate} from "./defaultTemplates";
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

        window.postMessage({
            name: "apisearch_suggestion",
            query_text: word,
            query: props.store.getCurrentQuery().toArray(),
            site: props.store.getSite(),
            device: props.store.getDevice(),
            user_type: props.store.getUserType(),
        }, "*");

        dispatchQueryStringEvent(props.store, 0);

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

    handleCategoryClick = (word, categoryValue, categoryName, categoryField) => {
        const props = this.props;

        window.postMessage({
            name: "apisearch_suggestion_with_category",
            query_text: word,
            category: categoryValue,
            category_name: categoryName,
            category_field: categoryField,
            query: props.store.getCurrentQuery().toArray(),
            site: props.store.getSite(),
            device: props.store.getDevice(),
            user_type: props.store.getUserType(),
        }, "*");

        dispatchQueryStringEvent(props.store, 0);

        onWordClickAction(
            props.environmentId,
            props.store.getCurrentQuery(),
            props.repository,
            word,
            categoryValue,
            categoryName,
            categoryField,
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
                    {state.words.map((word, index) => {
                        const templateData = {word};
                        let categoryList = [];

                        if (index === 0) {
                            categoryList = props
                                .store
                                .currentResult
                                .getMetadataValue("first_suggestion_categories") ?? [];
                        }

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

                                <div>
                                    {categoryList.map((item) => {
                                        return <div
                                            className={`as-suggestions__item_category`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                that.handleCategoryClick(
                                                    word, item.value,
                                                    props.categoryName, props.categoryField,
                                                );
                                            }}
                                        >
                                            <Template
                                                template={props.template.category_item}
                                                data={item}
                                                dictionary={this.props.dictionary}
                                            />
                                        </div>;
                                    })}
                                </div>
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
        category_item: defaultItemCategoryTemplate,
    },
};

export default SuggestionsFilterComponent;
