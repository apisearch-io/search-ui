import { h, render } from 'preact';

import { initialDataFetchAction } from "./ApisearchActions";
import {Repository} from 'apisearch';
import Store from "./Store";
import Widget from "./widgets/Widget";
import container from "./Container";
import {bootstrap} from "./Bootstrap";
import {createEnvironmentId} from "./Environment";
import widgets from "./widgets/Widgets";
import {APISEARCH_DISPATCHER, APISEARCH_UI} from "./Constants";

/**
 * ApisearchUI class
 */
export default class ApisearchUI {

    private environmentId:string;
    private repository:Repository;
    private activeWidgets:Widget[];
    private store:Store;

    /**
     * Constructor
     *
     * @param environmentId
     * @param repository
     * @param store
     */
    public constructor(
        environmentId:string,
        repository:Repository,
        store:Store
    ) {
        /**
         * Environment Id
         */
        this.environmentId = environmentId;
        this.repository = repository;
        this.activeWidgets = [];

        /**
         * Store related properties
         */
        this.store = store;
    }

    /**
     * Initialize components
     *
     * @param firstQuery
     */
    init({firstQuery = true} = {}) {
        /**
         * 1.- Register all events on the store
         */
        this.store.on('render', () => this.render());

        /**
         * 2.- Trigger the initial render: (Mount the components)
         *     To let components setup its configuration on componentWillMount()
         */
        this.render();

        /**
         * 3.- Dispatch the initial data request
         *     With all widget previous initial configurations
         */
        if (
            typeof firstQuery === 'undefined' ||
            true === firstQuery
        ) {
            initialDataFetchAction(
                this.environmentId,
                this.store.getCurrentQuery(),
                this.repository
            );
        }
    }

    /**
     * Add new widget
     *
     * @param widget
     *
     * @return {ApisearchUI}
     */
    addWidget(widget:Widget) : ApisearchUI {
        this.activeWidgets = [...this.activeWidgets, widget];
        return this;
    }

    /**
     * Add components in bulk mode
     *
     * @param widgets
     *
     * @return {ApisearchUI}
     */
    addWidgets(...widgets:Widget[]) : ApisearchUI {
        widgets.map(widget => this.addWidget(widget));
        return this;
    }

    /**
     * Render.
     *
     * Loop all active components
     * Hydrate them with new props
     * And render them.
     */
    render() {
        this.activeWidgets.map(widget => {
            widget.render(
                this.environmentId,
                this.store,
                this.repository
            );
        });
    }

    /**
     * Create instance
     *
     * @param appId
     * @param indexId
     * @param token
     * @param options
     *
     * @return {ApisearchUI}
     */
    static create (
        appId:string,
        indexId:string,
        token:string,
        options: any = {}
    ) : ApisearchUI {
        /**
         * Build environment Id
         */
        const environmentId = createEnvironmentId();

        /**
         * Bootstrapping ApisearchUI application
         */
        bootstrap(
            environmentId,
            appId,
            indexId,
            token,
            options
        );

        /**
         * Register handleActions method (store reducer)
         * into the event dispatcher
         */
        const apisearchUI = container.get(`${APISEARCH_UI}__${environmentId}`);
        const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);
        dispatcher.register(
            apisearchUI.store.handleActions.bind(
                apisearchUI.store
            )
        );

        /**
         * Add widgets
         */
        apisearchUI.widgets = widgets;

        /**
         * Return ApisearchUI instance
         */
        return apisearchUI;
    };
}