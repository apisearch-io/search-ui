import {ItemUUID} from "apisearch/lib/Model/ItemUUID";
import {Component, h} from 'preact';
import {useCallback, useEffect, useRef} from 'preact/compat';
import {APISEARCH_CONFIG, APISEARCH_UI} from "../../Constants";
import container from "../../Container";
import Template from "../Template";
import {defaultItemsListTemplate, defaultItemTemplate, defaultNoResultsItemTemplate} from "./defaultTemplates";
import Item from "./Item";
import {configureQuery, infiniteScrollNextPageAction} from "./ResultActions";
import {ResultProps} from "./ResultProps";
import {ResultState} from "./ResultState";

/**
 * Result Component
 */
class ResultComponent extends Component<ResultProps, ResultState> {

    private fromLoadingNextPage: boolean = false;
    private observer = useRef();
    private endResultsBoxRef = useCallback((node) => {
        if (this.observer.current instanceof IntersectionObserver) {
            this.observer.current.disconnect();
        }

        this.observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const {
                    environmentId,
                    store,
                    repository,
                } = this.props;

                this.fromLoadingNextPage = true;
                infiniteScrollNextPageAction(
                    environmentId,
                    store.getCurrentQuery(),
                    repository,
                    this.state.page + 1,
                );
            }
        });

        if ((this.observer.current instanceof IntersectionObserver) && node) {
            this.observer.current.observe(node);
        }
    }, []);

    /**
     * Constructor
     */
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            page: 0,
            hasNewPage: false,
            focus: props.fadeInSelector === "",
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
            this.setState((prevState) => {
                return {
                    items: [],
                    page: 0,
                    hasNewPage: false,
               };
            });
            return;
        }

        const currentResult = props.store.getCurrentResult();
        const currentQuery = props.store.getCurrentQuery();
        const items = currentResult.getItems();
        const currentPage = currentQuery.getPage();
        const hasNewPage = (currentResult.getTotalHits() > (currentPage * currentQuery.getSize()));
        const currentItems = this.fromLoadingNextPage
            ? this.state.items.concat(items)
            : items;

        this.fromLoadingNextPage = false;
        this.setState((prevState) => {
            return {
                items: currentItems,
                page: props.store.getCurrentQuery().getPage(),
                hasNewPage: hasNewPage,
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
     * Render
     *
     * @return {any}
     */
    public render() {
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
        const wrapperRef = useRef(null);
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

        window.top.postMessage({
            name: "apisearch_result_items",
            items,
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

        /**
         * New version
         */
        return (
            <div className={`as-result ${containerClassName}`} ref={wrapperRef}>
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
                                        dictionary={this.props.dictionary}
                                    />;
                                })}
                                {hasInfiniteScrollNextPage
                                    ? <div
                                        id={`as-result__infinite_scroll_inspector`}
                                        ref={this.endResultsBoxRef}
                                        style={`bottom: ${infiniteScrollMargin}px; position: relative; width: 100%;`}
                                    />
                                    : ""}
                            </div>
                        )
                        : <Template
                            template={props.template.noResults}
                            data={{
                                query: currentQuery.getQueryText(),
                            }}
                            className={`as-result__noresults ${props.classNames.noResults}`}
                            dictionary={this.props.dictionary}
                        />
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
        const userId = config.user_id;
        const clickParameters = typeof userId === "string"
            ? appId + '", "' + indexId + '", "' + itemId + '", "' + userId
            : appId + '", "' + indexId + '", "' + itemId;

        const mainFields = {};
        Object.assign(
            mainFields,
            item.getMetadata(),
            item.getIndexedMetadata(),
            item.getHighlights(),
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

        return {
            ...props.formatData(item),
            ...{
                key: "item_" + itemId,
                uuid_composed: itemId,
                click: apisearchReference + '.click("' + clickParameters + '");',
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
    },
    formatData: (data) => data,
    fadeInSelector: "",
    fieldsConciliation: {},
};

export default ResultComponent;
