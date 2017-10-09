import apisearch from 'apisearch';
import WidgetFactory from "./WidgetFactory";
import AbstractWidget from "./Widgets/AbstractWidget";

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
        this.currentQuery = this.api
            .query
            .createMatchAll();
    }

    /**
     * Adds single widget to
     * the current activeWidgets Store
     * @param widget
     * @returns {ApisearchUI}
     */
    addWidget(widget) {
        if (widget instanceof AbstractWidget === false) {
            throw new TypeError(`Given widget must be type of "AbstractWidget".`);
        }

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

        widgets.map(widget => {
            widget.render();

            document
                .querySelector(`${widget.target} > input`)
                .addEventListener(widget.eventTrigger, e => {
                    // Updating the current query object
                    // with the widget method
                    this.currentQuery = widget.updateQuery(this.currentQuery, e.target.value);

                    // Request data to apisearch servers
                    // using the new updated query object
                    this.api.search(this.currentQuery, (res, err)  =>  {
                        this.reloadComponents(res);
                    });
                })
            ;
        })
    }

    /**
     * @todo: implement this method
     */
    reloadComponents(data) {
        // the response is in data value
        // here we should re-render all components
        // --> result-container, some filters, pagination, etc
        console.log(data)
    }
}