export class Dispatcher {
    events = {};

    registerListener (event, callback) {
        // Create the event if not exists
        if (this.events[event] === undefined) {
            this.events[event] = {
                listeners: []
            }
        }

        this.events[event].listeners.push(callback);
    }

    dispatch (event, payload) {
        this.events[event].listeners.forEach((listener) => {
            listener(payload);
        });
    }
}
