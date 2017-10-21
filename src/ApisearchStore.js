import { EventEmitter } from "events";
import dispatcher from "./dispatcher";

class ApisearchStore extends EventEmitter {
    constructor() {
        super();

        this.data = {
            query: {
                q: ''
            },
            aggregations: {
                total_elements: 0
            },
            items: [],
            total_hits: 0,
            total_items: 0
        };
    }

    getData() {
        return this.data;
    }

    handleActions(action) {

        /**
         * this is what we call a reducer
         * on a redux architecture
         */

        if (action.type === 'FETCH_DATA') {
            this.data = action.payload
        }

        this.emit('change');
    }
}

const apisearchStore = new ApisearchStore;
dispatcher.register(
    apisearchStore.handleActions.bind(apisearchStore)
);

export default apisearchStore;

