import ApisearchUI from "./ApisearchUI";

/**
 * ApisearchUIFactory class
 */
export default class ApisearchUIFactory {

    private config: any;

    /**
     * Create instance
     *
     * @param config
     *
     * @return {ApisearchUIFactory}
     */
    public static fromConfig(config: any): ApisearchUIFactory {

        const instance = new ApisearchUIFactory();
        instance.config = config;

        return instance;
    }

    /**
     * @param hash
     *
     * @return {ApisearchUI}
     */
    public createUI(hash: string = null) {
        return ApisearchUI.create(
            this.config,
            hash,
        );
    }
}
