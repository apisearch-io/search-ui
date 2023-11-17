"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var preact_1 = require("preact");
var Template_1 = require("../Template");
var defaultTemplates_1 = require("./defaultTemplates");
/**
 * Result Information Component
 */
var BannerComponent = /** @class */ (function (_super) {
    __extends(BannerComponent, _super);
    /**
     * Constructor
     */
    function BannerComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            mobile_img: "",
            desktop_img: "",
            url: ""
        };
        return _this;
    }
    /**
     * Component will receive props
     *
     * @param props
     */
    BannerComponent.prototype.componentWillReceiveProps = function (props) {
        var _a;
        if (props.store.getCurrentResult() == null) {
            this.setState(function (prevState) {
                return {
                    mobile_img: "",
                    desktop_img: "",
                    url: ""
                };
            });
            return;
        }
        var banners = (_a = props.store.getCurrentResult().metadata.banners) !== null && _a !== void 0 ? _a : [];
        if (!banners) {
            this.setState(function (prevState) {
                return {
                    mobile_img: "",
                    desktop_img: "",
                    url: ""
                };
            });
            return;
        }
        var filteredBanners = banners.filter(function (banner) { return banner.position === props.position; });
        if (filteredBanners.length === 0) {
            this.setState(function (prevState) {
                return {
                    mobile_img: "",
                    desktop_img: "",
                    url: ""
                };
            });
            return;
        }
        var firstBanner = filteredBanners[0];
        this.setState(function (prevState) {
            return {
                mobile_img: firstBanner.mobile_img,
                desktop_img: firstBanner.desktop_img,
                url: firstBanner.url
            };
        });
    };
    BannerComponent.prototype.render = function () {
        var _a;
        if (this.state.desktop_img === "") {
            return;
        }
        var data = {
            desktop_img: this.state.desktop_img,
            mobile_img: (_a = this.state.mobile_img) !== null && _a !== void 0 ? _a : this.state.desktop_img,
            url: this.state.url,
            has_url: this.state.url !== "",
            breaking_point_size: this.props.breakingPointSize,
            image_prefix: this.props.imagePrefix
        };
        return ((0, preact_1.h)(Template_1["default"], { template: defaultTemplates_1.defaultBannerTemplate, data: data, dictionary: this.props.dictionary }));
    };
    return BannerComponent;
}(preact_1.Component));
exports["default"] = BannerComponent;
