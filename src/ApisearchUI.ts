import { h } from "preact";

import {HttpRepository, ItemUUID} from "apisearch";
import apisearch from "apisearch";
import { initialDataFetchAction } from "./ApisearchActions";
import {bootstrap} from "./Bootstrap";
import {APISEARCH_DISPATCHER, APISEARCH_UI} from "./Constants";
import container from "./Container";
import {createEnvironmentId} from "./Environment";
import Store from "./Store";
import Widget from "./widgets/Widget";
import widgets from "./widgets/Widgets";

/**
 * ApisearchUI class
 */
export default class ApisearchUI {

    private environmentId: string;
    private reference: ApisearchUI;
    private repository: HttpRepository;
    private activeWidgets: Widget[];
    private store: Store;
    public widgets: any;

    /**
     * Constructor
     *
     * @param environmentId
     * @param repository
     * @param store
     */
    public constructor(
        environmentId: string,
        repository: HttpRepository,
        store: Store,
    ) {
        /**
         * Environment Id
         */
        this.environmentId = environmentId;
        this.repository = repository;
        this.activeWidgets = [];
        this.widgets = widgets;

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
    public init({firstQuery = true} = {}) {
        /**
         * 1.- Register all events on the store
         */
        this.store.on("render", () => this.render());

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
            typeof firstQuery === "undefined" ||
            true === firstQuery
        ) {
            initialDataFetchAction(
                this.environmentId,
                this.store.getCurrentQuery(),
                this.repository,
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
    public addWidget(widget: Widget): ApisearchUI {
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
    public addWidgets(...widgets: Widget[]): ApisearchUI {
        widgets.map((widget) => this.addWidget(widget));
        return this;
    }

    /**
     * Render.
     *
     * Loop all active components
     * Hydrate them with new props
     * And render them.
     */
    public render() {
        this.activeWidgets.map((widget) => {
            widget.render(
                this.environmentId,
                this.store,
                this.repository,
            );
        });
    }

    /**
     * Attach a function into an event
     *
     * @param eventName
     * @param action
     */
    public attach(
        eventName: string,
        action: any,
    ) {
        this
            .store
            .on(eventName, action);
    }

    /**
     * Create instance
     *
     * @param config
     *
     * @return {any}
     */
    public static create(config: any): ApisearchUI {

        apisearch.ensureRepositoryConfigIsValid(config);

        /**
         * Build environment Id
         */
        const environmentId = createEnvironmentId();

        /**
         * Bootstrapping ApisearchUI application
         */
        bootstrap(
            environmentId,
            config,
        );

        /**
         * Register handleActions method (store reducer)
         * into the event dispatcher
         */
        const apisearchUI = container.get(`${APISEARCH_UI}__${environmentId}`);
        const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);
        dispatcher.register(
            apisearchUI.store.handleActions.bind(
                apisearchUI.store,
            ),
        );

        /**
         * Add widgets
         */
        apisearchUI.widgets = widgets;

        const uiId = `ui_${Math.ceil(Math.random() * (9999999 - 1) + 1)}`;
        apisearchUI.reference = uiId;
        window[uiId] = apisearchUI;

        /**
         * Return ApisearchUI instance
         */
        return apisearchUI;
    }

    /**
     * Click
     *
     * @param app_id
     * @param index_id
     * @param item_id
     * @param user_id
     *
     * @return {any}
     */
    public click(
        app_id: string,
        index_id: string,
        item_id: string,
        user_id: string
    )
    {
        this
            .repository
            .click(app_id, index_id, item_id, user_id);
    }
}
