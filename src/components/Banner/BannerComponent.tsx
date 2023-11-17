import {Component, h} from "preact";
import Template from "../Template";
import {BannerProps} from "./BannerProps";
import {BannerState} from "./BannerState";
import {defaultBannerTemplate} from "./defaultTemplates";

/**
 * Result Information Component
 */
class BannerComponent extends Component<BannerProps, BannerState> {

    /**
     * Constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            mobile_img: "",
            desktop_img: "",
            url: "",
        };
    }

    /**
     * Component will receive props
     *
     * @param props
     */
    componentWillReceiveProps(props) {

        if (props.store.getCurrentResult() == null) {
            this.setState((prevState) => {
                return {
                    mobile_img: "",
                    desktop_img: "",
                    url: "",
                };
            });

            return;
        }

        const banners = props.store.getCurrentResult().metadata.banners ?? [];
        if (!banners) {
            this.setState((prevState) => {
                return {
                    mobile_img: "",
                    desktop_img: "",
                    url: "",
                };
            });

            return;
        }

        const filteredBanners = banners.filter((banner) => banner.position === props.position);
        if (filteredBanners.length === 0) {
            this.setState((prevState) => {
                return {
                    mobile_img: "",
                    desktop_img: "",
                    url: "",
                };
            });

            return;
        }

        const firstBanner = filteredBanners[0];
        this.setState((prevState) => {
            return {
                mobile_img: firstBanner.mobile_img,
                desktop_img: firstBanner.desktop_img,
                url: firstBanner.url,
            };
        });
    }

    render() {

        if (this.state.desktop_img === "") {
            return;
        }

        const data = {
            desktop_img: this.state.desktop_img,
            mobile_img: this.state.mobile_img ?? this.state.desktop_img,
            url: this.state.url,
            has_url: this.state.url !== "",
            breaking_point_size: this.props.breakingPointSize,
            image_prefix: this.props.imagePrefix,
        };

        return (
            <Template
                template={defaultBannerTemplate}
                data={data}
                dictionary={this.props.dictionary}
            />
        );
    }
}

export default BannerComponent;
