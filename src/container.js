/**
 * Micro Dependency Injection Container
 */
class Container {
    /**
     * Constructor.
     */
    constructor() {
        this.services = {};
    }

    /**
     * Get service
     */
    get(id) {
        if (this.services[id]) {
            return this.services[id];
        }

        throw new Error(`Service with id (${id}) is not registered.`)
    }

    /**
     * Register service
     */
    register(id, serviceCallback) {
        let currentServiceIds = Object.keys(this.services);
        let serviceExists = currentServiceIds.some(serviceId => id === serviceId);

        if (false === serviceExists) {
            this.services = {
                ...this.services,
                [id]: serviceCallback()
            }
        }
    }
}

const container = new Container();
export default container;