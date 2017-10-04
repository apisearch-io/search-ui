/**
 * Simple Event dispatcher
 */
export default class EventDispatcher {
    constructor() {
        this.events = {};
    }

    on(eventId, callback) {
        let event = this.events[event];

        if (typeof event !== 'undefined') {
            return callback(event);
        }
    }

    dispatch({eventId, event: {}}) {
        this.events = {
            ...this.events,
            [eventId]: event
        }
    }

    removeEvent(event) {
        // silent pass
    }
}