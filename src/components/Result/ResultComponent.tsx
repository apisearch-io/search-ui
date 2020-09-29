import { h, Component } from 'preact';
import { useRef, useState, useEffect } from 'preact/compat';
import Template from "../Template";
import {defaultItemsListTemplate} from "./defaultTemplates";
import {configureQuery} from "./ResultActions";
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
    /**
     * Constructor
     */
    constructor(props) {
        super(props);

        this.state = {
            itemsId: [],
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
                        itemsId: prevState.itemsId,
                        focus: !ref.current || event.target.closest(fadeInSelector)
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

        let itemsId = [];
        if (props.currentResult == null) {
            this.setState(prevState => {
                return {
                   itemsId: itemsId
               };
            });
            return;
        }

        const items = props.currentResult.getItems();

        items.map(function(item) {
            itemsId.push(item.uuid.composedUUID());
        });

        this.setState(prevState => {
            return {
               itemsId: itemsId
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
            props.currentQuery,
            props.itemsPerPage,
            props.highlightsEnabled,
            props.promote.map((itemUUID) => {
                return itemUUID instanceof ItemUUID
                    ? itemUUID
                    : ItemUUID.createFromArray(itemUUID)
            }),
            props.exclude.map((itemUUID) => {
                return itemUUID instanceof ItemUUID
                    ? itemUUID
                    : ItemUUID.createFromArray(itemUUID)
            }),
            props.fields,
            props.filter
        );
    }

    /**
     * Render
     *
     * @return {any}
     */
    render() {
        const props = this.props;
        const dirty = props.dirty;
        const containerClassName = props.classNames.container;
        const itemsListClassName = props.classNames.itemsList;
        const placeholderClassName = props.classNames.placeholder;
        const environmentId = props.environmentId;
        const config = container.get(`${APISEARCH_CONFIG}__${environmentId}`);
        const apisearchUI = container.get(`${APISEARCH_UI}__${environmentId}`);
        const apisearchReference = apisearchUI.reference;

        const itemsListTemplate = props.template.itemsList;
        const placeholderTemplate = props.template.placeholder;

        const formatData = props.formatData;
        const currentResult = props.currentResult;
        const currentQuery = props.currentQuery;
        const currentVisibleResults = props.currentVisibleResults;
        const wrapperRef = useRef(null);
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
        const items = currentResult.getItems();
        let reducedTemplateData = {
            query: currentQuery.getQueryText()
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

                    return {
                        ...formatData(item),
                        ...{
                            'click': apisearchReference + '.click("'+clickParameters+'");'
                        }
                    }
                })
                : [],
        };

        return (
            <div className={`as-result ${containerClassName}`} ref={wrapperRef}>
                {(placeholderTemplate && dirty)
                    ? <Template
                        template={placeholderTemplate}
                        className={`as-result__placeholder ${placeholderClassName}`}
                    />
                    : <Template
                        template={itemsListTemplate}
                        data={formattedTemplateData}
                        className={`as-result__itemsList ${itemsListClassName}`}
                    />
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
    fadeInSelector: ''
};

export default ResultComponent;
