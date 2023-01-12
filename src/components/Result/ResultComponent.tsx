import {ItemUUID} from "apisearch/lib/Model/ItemUUID";
import {Component, h} from "preact";
import {useCallback, useEffect, useRef} from "preact/compat";
import {APISEARCH_CONFIG, APISEARCH_UI} from "../../Constants";
import container from "../../Container";
import Template from "../Template";
import {
    defaultAlternativeAllResultsTemplate, defaultAlternativeTitleTemplate,
    defaultItemsListTemplate,
    defaultItemTemplate, defaultNextPageButtonTemplate,
    defaultNoResultsItemTemplate,
} from "./defaultTemplates";
import Item from "./Item";
import {configureQuery, infiniteScrollNextPageAction} from "./ResultActions";
import {ResultProps} from "./ResultProps";
import {ResultState} from "./ResultState";
import {onWordClickAction} from "../Common";

/**
 * Result Component
 */
class ResultComponent extends Component<ResultProps, ResultState> {

    private fromLoadingNextPage: boolean = false;
    private observer = useRef();
    private currentExpectedPage;
    private endResultsBoxRef = useCallback((node) => {
        if (this.observer.current instanceof IntersectionObserver) {
            this.observer.current.disconnect();
        }

        this.observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                this.loadNextPage();
            }
        });

        if ((this.observer.current instanceof IntersectionObserver) && node) {
            this.observer.current.observe(node);
        }
    }, []);

    private loadNextPage() {
        const {
            environmentId,
            store,
            repository,
        } = this.props;

        this.fromLoadingNextPage = true;
        this.currentExpectedPage = this.state.page + 1;
        infiniteScrollNextPageAction(
            environmentId,
            store.getCurrentQuery(),
            repository,
            this.currentExpectedPage,
        );
    }

    /**
     * Constructor
     */
    constructor(props) {
        super(props);

        this.state = {
            customResponse: "",
            focus: props.fadeInSelector === "",
            hasNewPage: false,
            items: [],
            page: 0,
        };
    }

    /**
     * Hook that change state once mouse clicks inside or outside the container
     */
    private addMouseDownListeners(ref, fadeInSelector) {
        useEffect(() => {
            const self = this;

            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {

                self.setState(() => {
                    return {
                        focus: event.target.closest(fadeInSelector) != null,
                    };
                });
            }

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    /**
     * Component will receive props
     *
     * @param props
     */
    public componentWillReceiveProps(props) {
        if (props.store.getCurrentResult() == null) {
            this.setState((_) => {
                return {
                    customResponse: "",
                    hasNewPage: false,
                    items: [],
                    page: 0,
               };
            });
            return;
        }

        const currentResult = props.store.getCurrentResult();
        const currentQuery = props.store.getCurrentQuery();
        const items = currentResult.getItems();
        const currentPage = this.page();
        const hasNewPage = (currentResult.getTotalHits() > (currentPage * currentQuery.getSize()));

        const currentItems = this.fromLoadingNextPage
            ? this.state.items.concat(items)
            : items;

        this.fromLoadingNextPage = false;
        this.currentExpectedPage = undefined;
        this.setState((_) => {
            return {
                customResponse: currentResult.getMetadataValue("custom_response"),
                hasNewPage,
                items: currentItems,
                page: currentPage,
            };
        });
    }

    /**
     * Component will mount
     */
    public componentWillMount() {

        const props = this.props;

        /**
         * Dispatch action
         */
        configureQuery(
            props.environmentId,
            props.store.getCurrentQuery(),
            props.itemsPerPage,
            props.highlightsEnabled,
            props.promote.map((itemUUID) => {
                return itemUUID instanceof ItemUUID
                    ? itemUUID
                    : ItemUUID.createFromArray(itemUUID);
            }),
            props.exclude.map((itemUUID) => {
                return itemUUID instanceof ItemUUID
                    ? itemUUID
                    : ItemUUID.createFromArray(itemUUID);
            }),
            props.fields,
            props.filter,
            props.minScore,
        );
    }

    /**
     * @param word
     */
    public handleAlternativeClick = (word) => {

        const props = this.props;

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
     * @private
     */
    private page() {
        return this.currentExpectedPage ?? this.props.store.getCurrentQuery().getPage();
    }

    /**
     * Render
     *
     * @return {any}
     */
    public render() {
        const that = this;
        const props = this.props;
        const dirty = props.store.isDirty();
        const containerClassName = props.classNames.container;
        const itemsListClassName = props.classNames.itemsList;
        const placeholderClassName = props.classNames.placeholder;
        const itemsListTemplate = props.template.itemsList;
        const placeholderTemplate = props.template.placeholder ?? "";
        const currentResult = props.store.getCurrentResult();
        const currentQuery = props.store.getCurrentQuery();
        const currentVisibleResults = props.currentVisibleResults;
        const subResults = Object.values(currentResult.getSubresults());
        const wrapperRef = useRef(null);
        const customResponse = currentResult.getMetadataValue("custom_response");
        const redirection = currentResult.getMetadataValue("redirection");

        // Check for custom response html
        let customResponseBody;
        if (customResponse) {
            customResponseBody = (
                <Template
                    template={customResponse.content}
                    className={`as-result__custom_response`}
                    dictionary={this.props.dictionary}
                />
            );

            if (customResponse.only) {
                return customResponseBody;
            }
        }

        let withoutEnterRedirection = false;
        if (redirection) {
            if (redirection.type === "automatic") {
                window.top.location.href = redirection.url;
            } else if (redirection.type === "on_enter") {
                window.postMessage({
                    name: "apisearch_bind_enter_redirection",
                    url: redirection.url,
                }, "*");
                withoutEnterRedirection = false;
            }
        }

        if (withoutEnterRedirection) {
            window.postMessage({
                name: "apisearch_bind_enter_redirection",
                url: undefined,
            }, "*");
        }

        const hasInfiniteScrollNextPage =
            (props.infiniteScroll !== false) &&
            (
                (props.infiniteScroll === true) ||
                (props.infiniteScroll >= 0)
            ) &&
            this.state.hasNewPage;

        const infiniteScrollMargin = hasInfiniteScrollNextPage
            ? (
                props.infiniteScroll === true
                    ? 0
                    : props.infiniteScroll
            )
            : undefined;

        if (props.fadeInSelector !== "") {
            this.addMouseDownListeners(wrapperRef, props.fadeInSelector);
        }

        if (!currentVisibleResults || !this.state.focus) {
            return (
                <div className={`as-result ${containerClassName}`}></div>
            );
        }

        /**
         * Data accessible to the template
         */

        const items = this.state.items;
        const reducedTemplateData = {
            query: currentQuery.getQueryText(),
            suggestions: currentResult.getSuggestions(),
        };

        /**
         * We should add positions to items
         * When the number of items to render is higher than the page size, we are in front of infinite scroll
         */
        const page = this.state.page;
        const isInfiniteActive = page > 1;
        let firstItem = ((this.state.page - 1) * currentQuery.getSize());
        let itemsForEvent = items;
        if (isInfiniteActive) {
            itemsForEvent = Array.prototype.slice.call(items, firstItem);
        }

        Array.prototype.forEach.call(itemsForEvent, (item) => {
            item.position = ++firstItem;
            item.id = item.getId();
        });

        window.postMessage({
            name: "apisearch_result_items",
            query: currentQuery.toArray(),
            query_text: currentQuery.getQueryText(),
            with_results: items.length > 0,
            page: this.state.page,
            site: props.store.getSite(),
            device: props.store.getDevice(),
            items: itemsForEvent.map((item) => {
                return {
                    fields: item.fields,
                    uuid: item.uuid,
                };
            }),
        }, "*");

        /**
         * Uses defined a custom items list. Old version
         */
        if (props.template.itemsList !== defaultItemsListTemplate) {
            return (
                <div className={`as-result ${containerClassName}`} ref={wrapperRef} style={"position: relative"}>
                    {(dirty)
                        ? <Template
                            template={placeholderTemplate}
                            className={`as-result__placeholder ${placeholderClassName}`}
                            dictionary={this.props.dictionary}
                        />
                        : <Template
                            template={itemsListTemplate}
                            data={{
                                ...reducedTemplateData,
                                items: (items)
                                    ? items.map((item) => this.hydrateItem(item))
                                    : [],
                            }}
                            className={`as-result__itemsList ${itemsListClassName}`}
                            dictionary={this.props.dictionary}
                        />
                    }
                    {hasInfiniteScrollNextPage
                        ? <div
                            ref={this.endResultsBoxRef}
                            style={`bottom: ${infiniteScrollMargin}px; position: relative;`}
                       />
                        : ""
                    }
                </div>
            );
        }

        if (dirty) {
            return (
                <div className={`as-result ${containerClassName}`} ref={wrapperRef}>
                    <Template
                        template={placeholderTemplate}
                        className={`as-result__placeholder ${placeholderClassName}`}
                        dictionary={props.dictionary}
                    />
                </div>
            );
        }

        /**
         * New version
         */
        return (
            <div className={`as-result ${containerClassName}`} ref={wrapperRef}>
                {customResponseBody}
                {(dirty)
                    ? <Template
                        template={placeholderTemplate}
                        className={`as-result__placeholder ${placeholderClassName}`}
                        dictionary={this.props.dictionary}
                    />
                    : ((items.length > 0)
                        ? (
                            <div className={`as-result__itemsList ${props.classNames.itemsList}`}>
                                {items.map((item) => {
                                    return <Item
                                        data={{
                                            ...reducedTemplateData,
                                            ...this.hydrateItem(item),
                                        }}
                                        template={props.template.item}
                                        className={`as-result__item ${props.classNames.item}`}
                                        dictionary={props.dictionary}
                                    />;
                                })}
                                {hasInfiniteScrollNextPage
                                    ? (props.infiniteScrollButton
                                            ? ""
                                            : (<div
                                                id={`as-result__infinite_scroll_inspector`}
                                                ref={this.endResultsBoxRef}
                                                style={`bottom: ${infiniteScrollMargin}px; position: relative; width: 100%;`}
                                            />)
                                    )
                                    : ""
                                }
                            </div>
                        )
                        : "")
                }

                {hasInfiniteScrollNextPage
                    ? (props.infiniteScrollButton
                            ? (<div onClick={(e) => {
                                that.loadNextPage();
                            }}>
                                <Template
                                    template={props.template.next_page_button}
                                    data={{
                                        page: this.state.page + 1,
                                    }}
                                />
                            </div>)
                            : ""
                    )
                    : ""
                }

                {(subResults.length > 0)
                    ? <div className={`as-result__alternativeList`}>
                        {subResults.map((subResult) => {
                            return <div className={`as-result__alternative`}>
                                <div className={`as-result__alternative_query`}>
                                    <span
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            that.handleAlternativeClick(subResult.metadata.query_text);
                                        }}
                                    >
                                        <Template
                                            template={props.template.alternative_title}
                                            data={{
                                                word: subResult.metadata.query_text_html,
                                            }}
                                        />
                                    </span>
                                    <a
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            that.handleAlternativeClick(subResult.metadata.query_text);
                                        }}
                                    >
                                        <Template
                                            template={props.template.alternative_all_results}
                                            data={{
                                                num: subResult.getTotalHits(),
                                            }}
                                            dictionary={props.dictionary}
                                        />
                                    </a>
                                </div>
                                <div className={`as-result__alternative_items`}>
                                    {subResult.items.map((item) => {
                                        return <Item
                                            data={{
                                                ...reducedTemplateData,
                                                ...this.hydrateItem(item),
                                            }}
                                            template={props.template.item}
                                            className={`as-result__alternative_item ${props.classNames.item}`}
                                            dictionary={this.props.dictionary}
                                        />;
                                    })}
                                </div>
                            </div>;
                        })}
                        </div>
                    : (
                        (items.length === 0)
                            ? <Template
                                template={props.template.noResults}
                                data={{
                                    query: currentQuery.getQueryText(),
                                }}
                                className={`as-result__noresults ${props.classNames.noResults}`}
                                dictionary={props.dictionary}
                            />
                            : ""
                    )
                }
            </div>
        );
    }

    /**
     * @param item
     */
    private hydrateItem(item: any) {
        const props = this.props;
        const environmentId = props.environmentId;
        const config = container.get(`${APISEARCH_CONFIG}__${environmentId}`);
        const apisearchUI = container.get(`${APISEARCH_UI}__${environmentId}`);
        const apisearchReference = apisearchUI.reference;

        let appId = config.app_id;
        const appUUID = item.getAppUUID();
        if (typeof appUUID === "object") {
            appId = appUUID.composedUUID();
        }

        let indexId = config.index_id;
        const indexUUID = item.getIndexUUID();
        if (typeof indexUUID === "object") {
            indexId = indexUUID.composedUUID();
        }

        const itemId = item.getUUID().composedUUID();
        const mainFields = {};
        Object.assign(
            mainFields,
            item.getMetadata(),
            item.getIndexedMetadata(),
        );

        const fieldsConciliation = {};
        Object.keys(props.fieldsConciliation).map((field, index) => {
            fieldsConciliation[field] = mainFields[props.fieldsConciliation[field]] ?? undefined;
        });

        Object.assign(
            mainFields,
            fieldsConciliation,
        );

        item.fields = mainFields;

        let queryText = "";
        if (this.props.store.getCurrentQuery()) {
            queryText = this.props.store.getCurrentQuery().getQueryText();
        }

        return {
            ...props.formatData(item),
            ...{
                key: "item_" + itemId,
                uuid_composed: itemId,
                click: apisearchReference + '.click("' + appId + '", "' + indexId + '", "' + itemId + '");',
                add_to_cart: apisearchReference + '.interact("add_cart", "' + appId + '", "' + indexId + '", "' + itemId + '");',
                query_text: queryText,
                highlights_enabled: this.props.highlightsEnabled,
                striptags: () => {
                    return (val, render) => render(val).replace(/(<([^>]+)>)/ig, "");
                },
            },
        };
    }
}

ResultComponent.defaultProps = {
    fields: [],
    itemsPerPage: 10,
    highlightsEnabled: false,
    promote: [],
    exclude: [],
    filter: (query) => null,
    classNames: {
        container: "",
        itemsList: "",
        item: "",
        noResults: "",
        placeholder: "",
    },
    template: {
        itemsList: defaultItemsListTemplate,
        item: defaultItemTemplate,
        noResults: defaultNoResultsItemTemplate,
        placeholder: null,
        alternative_title: defaultAlternativeTitleTemplate,
        alternative_all_results: defaultAlternativeAllResultsTemplate,
        next_page_button: defaultNextPageButtonTemplate,
    },
    formatData: (data) => data,
    fadeInSelector: "",
    fieldsConciliation: {},
};

export default ResultComponent;
