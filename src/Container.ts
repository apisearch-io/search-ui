/**
 * Apisearch Dependency Injection Container
 */
class Container {

    private services:any = {};

    /**
     * Get service
     *
     * @param id
     */
    get(id:string) {
        if (this.services[id]) {
            return this.services[id];
        }

        throw new Error(`Service with id (${id}) is not registered.`)
    }

    /**
     * Register service
     *
     * @param id
     * @param serviceCallback
     */
    register(
        id:string,
        serviceCallback:Function
    ) {
        this.services[id] = serviceCallback();
    }
}

export default new Container;