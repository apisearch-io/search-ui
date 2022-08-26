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
var Common_1 = require("../Common");
/**
 * Suggestion Filter Component
 */
var SuggestionsFilterComponent = /** @class */ (function (_super) {
    __extends(SuggestionsFilterComponent, _super);
    function SuggestionsFilterComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * @param word
         * @param categoryField
         * @param categoryValue
         */
        _this.handleClick = function (word, categoryField, categoryValue) {
            if (categoryField === void 0) { categoryField = null; }
            if (categoryValue === void 0) { categoryValue = null; }
            var props = _this.props;
            if (typeof word === "string") {
                word = word
                    .replace(/<em>/g, "")
                    .replace(/<\/em>/g, "");
            }
<<<<<<< HEAD
            /**
             * Dispatch action
             */
            Common_1.onWordClickAction(props.environmentId, props.store.getCurrentQuery(), props.repository, word);
=======
            window.postMessage({
                name: "apisearch_suggestion_clicked",
                word: word,
                category_field: categoryField,
                category_value: categoryValue
            }, "*");
>>>>>>> WIP
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
        SuggestionsFilterActions_1.enableSuggestions(environmentId, currentQuery, props.numberOfSuggestions, props.firstSuggestionCategories);
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
        var _a, _b;
        var containerClassName = props.classNames.container;
        var topClassName = props.classNames.top;
        var itemsListClassName = props.classNames.itemsList;
        var itemClassName = props.classNames.item;
        var noSuggestionsClassName = state.words.length > 0
            ? ""
            : "suggestions-empty";
        var topTemplate = props.template.top;
        var itemTemplate = props.template.item;
        var itemWithCategoryTemplate = props.template.itemWithCategory;
        var that = this;
        var firstSuggestionCategories = (_a = props.store.getCurrentResult().getMetadataValue("first_suggestion_categories")) !== null && _a !== void 0 ? _a : [];
        var firstSuggestionCategoryField = (_b = props.store.getCurrentResult().getMetadataValue("first_suggestion_categories_field")) !== null && _b !== void 0 ? _b : [];
        var hasCategories = firstSuggestionCategories.length > 0;
        return (preact_1.h("div", { className: "as-suggestions " + containerClassName + " " + noSuggestionsClassName },
            preact_1.h(Template_1["default"], { template: topTemplate, className: "as-suggestions__top " + topClassName, dictionary: this.props.dictionary }),
            preact_1.h("div", { className: "as-suggestions__itemsList " + itemsListClassName }, state.words.map(function (word, index) {
                var shouldPrintCategories = hasCategories && (index === 0);
                var templateData = { word: word };
                return (preact_1.h("div", { className: "as-suggestions__item " + itemClassName, onClick: function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        that.handleClick(word);
                    } },
                    preact_1.h(Template_1["default"], { template: itemTemplate, data: templateData, dictionary: _this.props.dictionary }),
                    (shouldPrintCategories)
                        ? (preact_1.h("div", { className: "as-suggestedSearch__itemCategories" }, firstSuggestionCategories.map(function (category) {
                            return (preact_1.h("div", { className: "as-suggestions__itemCategory", onClick: function (e) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    that.handleClick(word, firstSuggestionCategoryField, category.value);
                                } },
                                preact_1.h(Template_1["default"], { template: itemWithCategoryTemplate, data: category, dictionary: _this.props.dictionary })));
                        })))
                        : ""));
            }))));
    };
    return SuggestionsFilterComponent;
}(preact_1.Component));
SuggestionsFilterComponent.defaultProps = {
    first_suggestion_categories: false,
    classNames: {
        container: '',
        top: '',
        itemsList: '',
        item: ''
    },
    template: {
        top: null,
        item: defaultTemplates_1.defaultItemTemplate,
        itemWithCategory: defaultTemplates_1.defaultItemWithCategoryTemplate
    }
};
exports["default"] = SuggestionsFilterComponent;
