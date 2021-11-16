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
var Helpers_1 = require("./Helpers");
var NavigationComponent_1 = require("./NavigationComponent");
var PaginationActions_1 = require("./PaginationActions");
/**
 * Pagination Component
 */
var PaginationComponent = /** @class */ (function (_super) {
    __extends(PaginationComponent, _super);
    /**
     * Constructor
     */
    function PaginationComponent() {
        var _this = _super.call(this) || this;
        /**
         * Handle click
         *
         * @param page
         */
        _this.handleClick = function (page) {
            var _a = _this.props, store = _a.store, environmentId = _a.environmentId, repository = _a.repository;
            var currentResult = store.getCurrentResult();
            var currentQuery = store.getCurrentQuery();
            var totalPages = (0, Helpers_1.getTotalPages)(currentResult.getTotalHits(), currentQuery.getSize());
            /**
             * Do not let go further
             */
            if (page <= 0)
                page = 1;
            if (page >= totalPages)
                page = totalPages;
            if (currentQuery.getPage() === page) {
                return;
            }
            /**
             * Dispatch change page action
             */
            (0, PaginationActions_1.paginationChangeAction)(environmentId, currentQuery, repository, page);
        };
        _this.state = {
            page: 1
        };
        return _this;
    }
    /**
     * Component will receive props
     *
     * @param props
     */
    PaginationComponent.prototype.componentWillReceiveProps = function (props) {
        var page = props.store.getCurrentQuery().getPage();
        this.setState(function (prevState) {
            return {
                page: page
            };
        });
    };
    /**
     * Render
     *
     * @return {any}
     */
    PaginationComponent.prototype.render = function () {
        var _this = this;
        var props = this.props;
        var currentResult = props.store.getCurrentResult();
        if (props.store.getCurrentResult() == null) {
            return;
        }
        var currentQuerySize = props.store.getCurrentQuery().getSize();
        var totalPages = (0, Helpers_1.getTotalPages)(currentResult.getTotalHits(), currentQuerySize);
        /**
         * Hide container if hits are empty
         */
        if (currentResult.getTotalHits() === 0 ||
            totalPages === 1) {
            return null;
        }
        var padding = props.padding;
        var goFirstLast = props.goFirstLast;
        var containerClassName = props.classNames.container;
        var itemClassName = props.classNames.item;
        var activeClassName = props.classNames.active;
        var disabledClassName = props.classNames.disabled;
        var nextClassName = props.classNames.next;
        var previousClassName = props.classNames.previous;
        var lastClassName = props.classNames.last;
        var firstClassName = props.classNames.first;
        var itemTemplate = props.template.item;
        var nextTemplate = props.template.next;
        var previousTemplate = props.template.previous;
        var firstTemplate = props.template.first;
        var lastTemplate = props.template.last;
        var currentQueryPage = props.store.getCurrentQuery().getPage();
        /**
         * Get Total pages
         */
        var pages = (0, Helpers_1.totalPagesToArray)(totalPages);
        /**
         *  Get pages spectre
         */
        var spectreSize = (padding * 2) + 1;
        var isTouchingLeft = currentQueryPage <= (padding + 1);
        var isTouchingRight = (currentQueryPage + padding) >= totalPages;
        var spectre = pages.slice((0, Helpers_1.getStart)(totalPages, padding, currentQueryPage, spectreSize, isTouchingLeft, isTouchingRight), (0, Helpers_1.getEnd)(totalPages, padding, currentQueryPage, spectreSize, isTouchingLeft, isTouchingRight));
        /**
         * Dynamic disabled classes
         */
        var previousDisabledClass = (currentQueryPage === 1) ? disabledClassName : '';
        var nextDisabledClass = (currentQueryPage === totalPages) ? disabledClassName : '';
        return ((0, preact_1.h)("ul", { className: "as-pagination " + containerClassName },
            (0, preact_1.h)(NavigationComponent_1["default"], { isVisible: goFirstLast, classNames: "as-pagination__item as-pagination__item--first " + firstClassName + " " + previousDisabledClass, template: firstTemplate, handleClick: function () { return _this.handleClick(1); } }),
            (0, preact_1.h)(NavigationComponent_1["default"], { isVisible: true, classNames: "as-pagination__item as-pagination__item--previous " + previousClassName + " " + previousDisabledClass, template: previousTemplate, handleClick: function () { return _this.handleClick(currentQueryPage - 1); } }),
            spectre.map(function (page) { return ((0, preact_1.h)("li", { className: "as-pagination__item as-pagination__item--link " + itemClassName + " " + ((currentQueryPage === page) ? activeClassName : ''), onClick: function () { return _this.handleClick(page); } },
                (0, preact_1.h)(Template_1["default"], { template: itemTemplate, data: { page: page.toLocaleString('de-DE') }, dictionary: _this.props.dictionary }))); }),
            (0, preact_1.h)(NavigationComponent_1["default"], { isVisible: true, classNames: "as-pagination__item as-pagination__item--next " + nextClassName + " " + nextDisabledClass, template: nextTemplate, handleClick: function () { return _this.handleClick(currentQueryPage + 1); } }),
            (0, preact_1.h)(NavigationComponent_1["default"], { isVisible: goFirstLast, classNames: "as-pagination__item as-pagination__item--last " + lastClassName + " " + nextDisabledClass, template: lastTemplate, handleClick: function () { return _this.handleClick(totalPages); } })));
    };
    return PaginationComponent;
}(preact_1.Component));
PaginationComponent.defaultProps = {
    padding: 3,
    goFirstLast: false,
    classNames: {
        container: '',
        item: '',
        active: 'as-pagination__item--active',
        disabled: 'as-pagination__item--disabled',
        next: '',
        first: '',
        previous: '',
        last: ''
    },
    template: {
        item: '{{page}}',
        next: '>',
        previous: '<',
        first: '<<',
        last: '>>'
    }
};
exports["default"] = PaginationComponent;
