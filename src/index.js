import apisearch from 'apisearch';
import WidgetFactory from "./WidgetFactory";
import EventDispatcher from "./EventDispatcher";

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

const dispatcher = new EventDispatcher();

class ApisearchUI {
    constructor(api) {
        this.currentQuery = api.query.createMatchAll();
        this.widgets = WidgetFactory;
        this.activeWidgets = [];
    }

    /**
     * Adds single widget to
     * the current activeWidgets Store
     * @param widget
     * @returns {ApisearchUI}
     */
    addWidget(widget) {
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
        widgets.map(widget => {
            this.addWidget(widget);
        });

        return this;
    }

    /**
     * Renders the widget to its targetted container
     * And re-attaches the event
     */
    init() {
        let widgets = this.activeWidgets || [];

        widgets.map(widget => {
            widget.render();
            this.currentQuery = widget.update(this.currentQuery);

            console.log(this.currentQuery)
        })
    }
}