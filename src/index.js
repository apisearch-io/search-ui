import apisearch from 'apisearch';
import WidgetFactory from "./WidgetFactory";
import AbstractReadWidget from "./Widgets/AbstractReadWidget";
import AbstractReadWriteWidget from "./Widgets/AbstractReadWriteWidget";

/**
 * ApisearchUI entry point
 *
 * @param apiKey
 * @returns {ApisearchUI}
 */
module.exports = function(apiKey) {
    let api = apisearch(apiKey);

    return new ApisearchUI(api);
};

class ApisearchUI {
    /**
     * Constructor
     * @param api
     */
    constructor(api) {
        this.api = api;
        this.widgets = WidgetFactory;
        this.activeWidgets = [];
        this.currentQuery = this.api.query.createMatchAll();
        this.data = {
            items: [],
            query: {},
            aggregations: {},
            total_hits: 0,
            total_items: 0
        }
    }

    /**
     * Adds single widget to
     * the current activeWidgets Store
     * @param widget
     * @returns {ApisearchUI}
     */
    addWidget(widget) {
        // @todo: this method needs to validate the widget types
        // if (widget instanceof AbstractWidget === false) {
        //     throw new TypeError(`Given widget must be type of "AbstractWidget".`);
        // }

        this.activeWidgets = [
            ...this.activeWidgets,
            widget
        ];

        return this;
    }

    /**
     * Adds multiple widgets to
     * the current activeWidgets store
     *
     * @param widgets
     * @returns {ApisearchUI}
     */
    addWidgets(...widgets) {
        widgets.map(widget => this.addWidget(widget));

        return this;
    }

    /**
     * Renders the widget to its target container
     * And attaches a DOM event
     */
    init() {
        let widgets = this.activeWidgets || [];

        // Perform initial search
        this.fetchData();

        widgets.forEach(widget => {
            // Request data to apisearch servers
            // Renders the initial state of the widget
            widget.render(this.data);

            document
                .querySelector(widget.target)
                .addEventListener(widget.eventTrigger, e => {
                    // Updating the current query object
                    // with the widget method additions/variations
                    // to the existing query
                    this.currentQuery = widget.updateQuery(
                        this.currentQuery,
                        e.target.value
                    );

                    // Request data to apisearch servers
                    // using the new updated query object
                    this.fetchData();

                    // Re-render all components/widgets
                    this.reloadComponents();

                    console.log(this)
                })
            ;
        })
    }

    /**
     * Reload DOM components
     * here we should re-render all components
     * --> result-container, some filters, pagination, total-hits etc
     */
    reloadComponents() {
        this.activeWidgets.map(widget => {
            // Only re-renders if widget is readable
            if (widget instanceof AbstractReadWidget) {
                widget.render(this.data);
            }
        });
    }

    /**
     * Perform search against
     * apisearch servers
     */
    fetchData() {
        this.api.search(this.currentQuery, (res, err)  =>  {
            const {
                items,
                query,
                aggregations,
                total_hits,
                total_items
            } = res;

            this.data = {
                ...this.data,
                items: items || [],
                query,
                aggregations,
                total_hits,
                total_items
            };
        });
    }
}