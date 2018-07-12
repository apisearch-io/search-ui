/**
 * Apisearch Dependency Injection Container
 */
class Container {

    private services: any = {};

    /**
     * Get service
     *
     * @param id
     */
    public get(id: string) {
        if (this.services[id]) {
            return this.services[id];
        }

        throw new Error(`Service with id (${id}) is not registered.`);
    }

    /**
     * Register service
     *
     * @param id
     * @param serviceCallback
     */
    public register(
        id: string,
        serviceCallback: Function,
    ) {
        this.services[id] = serviceCallback();
    }
}

export default new Container;
