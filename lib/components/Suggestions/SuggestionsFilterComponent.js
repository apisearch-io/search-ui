"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var preact_1 = require("preact");
var defaultTemplates_1 = require("./defaultTemplates");
var SuggestionsFilterActions_1 = require("./SuggestionsFilterActions");
var Template_1 = require("../Template");
/**
 * Suggestion Filter Component
 */
var SuggestionsFilterComponent = /** @class */ (function (_super) {
    __extends(SuggestionsFilterComponent, _super);
    function SuggestionsFilterComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * @param word
         */
        _this.handleClick = function (word) {
            var props = _this.props;
            if (typeof word === "string") {
                word = word
                    .replace(/<em>/g, "")
                    .replace(/<\/em>/g, "");
            }
            /**
             * Dispatch action
             */
            SuggestionsFilterActions_1.onWordClickAction(props.environmentId, props.store.getCurrentQuery(), props.repository, word);
        };
        return _this;
    }
    /**
     * Component will mount
     */
    SuggestionsFilterComponent.prototype.componentWillMount = function () {
        this.setState(function (prevState) {
            return {
                words: []
            };
        });
        var props = this.props;
        var environmentId = props.environmentId;
        var currentQuery = props.store.getCurrentQuery();
        /**
         * Dispatch action
         */
        SuggestionsFilterActions_1.enableSuggestions(environmentId, currentQuery, props.numberOfSuggestions);
    };
    /**
     * Component will receive props
     *
     * @param props
     */
    SuggestionsFilterComponent.prototype.componentWillReceiveProps = function (props) {
        this.setState(function (prevState) {
            return {
                words: props
                    .store
                    .getCurrentResult()
                    .getSuggestions()
            };
        });
    };
    /**
     * Render
     *
     * @return {any}
     */
    SuggestionsFilterComponent.prototype.render = function (props, state) {
        var _this = this;
        var containerClassName = props.classNames.container;
        var topClassName = props.classNames.top;
        var itemsListClassName = props.classNames.itemsList;
        var itemClassName = props.classNames.item;
        var noSuggestionsClassName = state.words.length > 0
            ? ""
            : "suggestions-empty";
        var topTemplate = props.template.top;
        var itemTemplate = props.template.item;
        var that = this;
        return (preact_1.h("div", { className: "as-suggestions " + containerClassName + " " + noSuggestionsClassName },
            preact_1.h(Template_1["default"], { template: topTemplate, className: "as-suggestions__top " + topClassName, dictionary: this.props.dictionary }),
            preact_1.h("div", { className: "as-suggestions__itemsList " + itemsListClassName }, state.words.map(function (word) {
                var templateData = {
                    word: word
                };
                return (preact_1.h("div", { className: "as-suggestions__item " + itemClassName, onClick: function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        that.handleClick(word);
                    } },
                    preact_1.h(Template_1["default"], { template: itemTemplate, data: templateData, dictionary: _this.props.dictionary })));
            }))));
    };
    return SuggestionsFilterComponent;
}(preact_1.Component));
SuggestionsFilterComponent.defaultProps = {
    classNames: {
        container: '',
        top: '',
        itemsList: '',
        item: ''
    },
    template: {
        top: null,
        item: defaultTemplates_1.defaultItemTemplate
    }
};
exports["default"] = SuggestionsFilterComponent;
