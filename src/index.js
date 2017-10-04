import apisearch from 'apisearch';
import WidgetFactory from "./WidgetFactory";


module.exports = function(apiKey) {
    let api = apisearch(apiKey);

    return new ApisearchUI(api)
};

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
        console.log(widgets);

        widgets.map(widget => {
            widget.render();
        })
    }
}