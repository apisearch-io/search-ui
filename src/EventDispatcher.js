/**
 * Simple Event dispatcher
 */
export default class EventDispatcher {
    constructor() {
        this.events = {};
    }

    on(eventId, callback) {
        let event = this.events[eventId];

        if (typeof event !== 'undefined') {
            this.removeEvent(eventId);
            return callback(event);
        }
    }

    dispatch({eventId, event = {}}) {
        this.events = {
            ...this.events,
            [eventId]: event
        }
    }

    removeEvent(eventId) {
        delete this.events[eventId];
    }
}