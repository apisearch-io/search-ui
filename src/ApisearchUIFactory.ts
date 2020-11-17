import ApisearchUI from "./ApisearchUI";

/**
 * ApisearchUIFactory class
 */
export default class ApisearchUIFactory {

    private config:any;

    /**
     * Create instance
     *
     * @param config
     *
     * @return {ApisearchUIFactory}
     */
    public static fromConfig(config: any): ApisearchUIFactory {

        const instance = new ApisearchUIFactory;
        instance.config = config;

        return instance;
    }

    /**
     * Create UI
     *
     * @return {ApisearchUI}
     */
    public createUI()
    {
        return ApisearchUI.create(this.config);
    }
}
