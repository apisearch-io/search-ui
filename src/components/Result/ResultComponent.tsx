import { h, Component } from 'preact';
import { useRef, useEffect, useCallback } from 'preact/compat';
import Template from "../Template";
import {defaultItemsListTemplate} from "./defaultTemplates";
import {configureQuery, infiniteScrollNextPageAction} from "./ResultActions";
import {ResultState} from "./ResultState";
import {ResultProps} from "./ResultProps";
import {ItemUUID} from "apisearch/lib/Model/ItemUUID";
import container from "../../Container";
import {
    APISEARCH_UI,
    APISEARCH_CONFIG,
} from "../../Constants";

/**
 * Result Component
 */
class ResultComponent extends Component<ResultProps, ResultState> {

    observer = useRef();
    endResultsBoxRef = useCallback(node => {
        if (this.observer.current instanceof IntersectionObserver) this.observer.current.disconnect()
        this.observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                const {
                    environmentId,
                    store,
                    repository
                } = this.props;

                infiniteScrollNextPageAction(
                    environmentId,
                    store.getCurrentQuery(),
                    repository,
                    this.state.page + 1
                )
            }
        })

        if ((this.observer.current instanceof IntersectionObserver) && node) this.observer.current.observe(node)
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
            focus: props.fadeInSelector == ''
        }
    }

    /**
     * Hook that change state once mouse clicks inside or outside the container
     */
    addMouseDownListeners(ref, fadeInSelector) {
        useEffect(() => {
            const self = this;

            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {

                self.setState(prevState => {
                    return {
                        items: prevState.items,
                        page: prevState.page,
                        focus: event.target.closest(fadeInSelector) != null
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
    componentWillReceiveProps(props) {

        if (props.store.getCurrentResult() == null) {
            this.setState(prevState => {
                return {
                    items: [],
                    page: 0,
                    hasNewPage: false
               };
            });
            return;
        }

        const currentResult = props.store.getCurrentResult();
        const currentQuery = props.store.getCurrentQuery();
        let items = currentResult.getItems();
        const currentPage = currentQuery.getPage();
        const hasNewPage = (currentResult.getTotalHits() > (currentPage * currentQuery.getSize()));

        const hasInfiniteScroll =
            (props.infiniteScroll !== false) &&
            (
                (props.infiniteScroll === true) ||
                (props.infiniteScroll >= 0)
            );

        if (hasInfiniteScroll && currentPage > 1) {
            items = this.state.items.concat(items);
        }

        this.setState(prevState => {
            return {
                items: items,
                page: props.store.getCurrentQuery().getPage(),
                hasNewPage: hasNewPage
            };
        });
    }

    /**
     * Component will mount
     */
    componentWillMount() {

        const props = this.props;

        /**
         * Dispatch action
         */
        configureQuery(
            props.environmentId,
            props.store.getCurrentQuery(),
            props.itemsPerPage,
            props.highlightsEnabled,
            props.suggestionsEnabled,
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
            props.minScore
        );
    }

    /**
     * Render
     *
     * @return {any}
     */
    render() {
        const props = this.props;
        const dirty = props.store.isDirty();
        const containerClassName = props.classNames.container;
        const itemsListClassName = props.classNames.itemsList;
        const placeholderClassName = props.classNames.placeholder;
        const environmentId = props.environmentId;
        const config = container.get(`${APISEARCH_CONFIG}__${environmentId}`);
        const apisearchUI = container.get(`${APISEARCH_UI}__${environmentId}`);
        const apisearchReference = apisearchUI.reference;

        const itemsListTemplate = props.template.itemsList;
        const placeholderTemplate = props.template.placeholder ?? '';

        const formatData = props.formatData;
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

        if (props.fadeInSelector != '') {
            this.addMouseDownListeners(wrapperRef, props.fadeInSelector);
        }

        if (!currentVisibleResults || !this.state.focus) {
            return (
                <div className={`as-result ${containerClassName}`}></div>
            )
        }

        /**
         * Data accessible to the template
         */

        const items = this.state.items;
        let reducedTemplateData = {
            query: currentQuery.getQueryText(),
            suggestions: currentResult.getSuggestions(),
        };

        /**
         * Format each item data
         */
        let formattedTemplateData = {
            ...reducedTemplateData,
            items: (items)
                ? items.map(function(item) {
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
                        ? appId+'", "'+indexId+'", "'+itemId+'", "'+userId
                        : appId+'", "'+indexId+'", "'+itemId;

                    let mainFields = {};
                    Object.assign(
                        mainFields,
                        item.getMetadata(),
                        item.getIndexedMetadata(),
                        item.getHighlights()
                    );

                    const fieldsConciliation = {};
                    Object.keys(props.fieldsConciliation).map(function(field, index) {
                        fieldsConciliation[field] = mainFields[props.fieldsConciliation[field]] ?? undefined;
                    })

                    Object.assign(
                        mainFields,
                        fieldsConciliation
                    );

                    item.fields = mainFields;

                    return {
                        ...formatData(item),
                        ...{
                            'key': 'item_' + itemId,
                            'uuid_composed': itemId,
                            'click': apisearchReference + '.click("'+clickParameters+'");'
                        }
                    }
                })
                : [],
        };

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
                        data={formattedTemplateData}
                        className={`as-result__itemsList ${itemsListClassName}`}
                        dictionary={this.props.dictionary}
                    />
                }
                {hasInfiniteScrollNextPage
                    ? <div
                        ref={this.endResultsBoxRef}
                        style={`position: absolute; bottom: ${infiniteScrollMargin}px;`}
                   />
                    : ""
                }
            </div>
        )
    }
}

ResultComponent.defaultProps = {
    fields: [],
    itemsPerPage: 10,
    highlightsEnabled: false,
    promote: [],
    exclude: [],
    filter: function (query) {},
    classNames: {
        container: '',
        itemsList: '',
        placeholder: ''
    },
    template: {
        itemsList: defaultItemsListTemplate,
        placeholder: null
    },
    formatData: data => data,
    fadeInSelector: '',
    fieldsConciliation: {}
};

export default ResultComponent;
