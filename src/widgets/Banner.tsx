import {Repository} from "apisearch";
import {h, render} from "preact";
import BannerComponent from "../components/Banner/BannerComponent";
import Store from "../Store";
import Widget from "./Widget";

/**
 * Banner
 */
class Banner extends Widget {

    /**
     * @param target
     * @param breakingPointSize
     * @param position
     * @param imagePrefix
     */
    constructor({
        target,
        breakingPointSize,
        position,
        imagePrefix,
    }) {
        super();
        this.target = target;
        this.component = <BannerComponent
            target={target}
            breakingPointSize={breakingPointSize}
            position={position}
            imagePrefix={imagePrefix}
        />;
    }

    /**
     * @param environmentId
     * @param store
     * @param repository
     * @param dictionary
     */
    public render(
        environmentId: string,
        store: Store,
        repository: Repository,
        dictionary: { [key: string]: string; },
    ) {
        this.component.props = {
            ...this.component.props,
            dictionary,
            environmentId,
            repository,
            store,
        };

        render(
            this.component,
            document.querySelector(this.target),
        );
    }
}

/**
 * @param settings
 */
export default (settings) => new Banner(settings);
