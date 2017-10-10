import apisearch from 'apisearch';
import WidgetFactory from "./WidgetFactory";
import AbstractReadWidget from "./Widgets/AbstractReadWidget";

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
        };
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

        widgets.forEach(widget => {
            // Request data to apisearch servers
            // Renders the initial state of the widget
            this.api.search(this.currentQuery, (res, err) => {
                widget.render(res)
            });

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
                    this.reloadComponents()
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
                this.api.search(this.currentQuery, (res, err) => {
                    widget.render(res);
                });
            }
        });
    }
}