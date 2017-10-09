import apisearch from 'apisearch';
import WidgetFactory from "./WidgetFactory";
import EventDispatcher from "./EventDispatcher";
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

class ApisearchUI extends EventDispatcher {
    /**
     * Constructor
     * @param api
     */
    constructor(api) {
        super();

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
        if (widget instanceof AbstractWidget === false) {
            throw new TypeError(`Given widget must be type of "AbstractWidget".`);
        }

        this.dispatch({
            eventId: 'widget-added',
            event: {
                payload: 'blablabla'
            }
        });

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
     * And re-attaches the event
     */
    init() {
        let widgets = this.activeWidgets || [];

        this.on('widget-added', event => console.log(event));

        widgets.map(widget => {
            widget.render();
        })
    }
}