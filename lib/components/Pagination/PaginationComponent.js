"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var preact_1 = require("preact");
var Template_1 = require("../Template");
var PaginationActions_1 = require("./PaginationActions");
var NavigationComponent_1 = require("./NavigationComponent");
var Helpers_1 = require("./Helpers");
/**
 * Pagination Component
 */
var PaginationComponent = /** @class */ (function (_super) {
    __extends(PaginationComponent, _super);
    function PaginationComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Handle click
         *
         * @param page
         */
        _this.handleClick = function (page) {
            var _a = _this.props, currentResult = _a.currentResult, environmentId = _a.environmentId, currentQuery = _a.currentQuery, repository = _a.repository;
            var totalPages = Helpers_1.getTotalPages(currentResult.getTotalHits(), currentQuery.getSize());
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
            PaginationActions_1.paginationChangeAction(environmentId, currentQuery, repository, page);
        };
        return _this;
    }
    /**
     * Render
     *
     * @return {any}
     */
    PaginationComponent.prototype.render = function () {
        var _this = this;
        var props = this.props;
        var currentResult = props.currentResult;
        var currentQuerySize = props.currentQuery.getSize();
        var totalPages = Helpers_1.getTotalPages(currentResult.getTotalHits(), currentQuerySize);
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
        var currentQueryPage = props.currentQuery.getPage();
        /**
         * Get Total pages
         */
        var pages = Helpers_1.totalPagesToArray(totalPages);
        /**
         *  Get pages spectre
         */
        var spectreSize = (padding * 2) + 1;
        var isTouchingLeft = currentQueryPage <= (padding + 1);
        var isTouchingRight = (currentQueryPage + padding) >= totalPages;
        var spectre = pages.slice(Helpers_1.getStart(totalPages, padding, currentQueryPage, spectreSize, isTouchingLeft, isTouchingRight), Helpers_1.getEnd(totalPages, padding, currentQueryPage, spectreSize, isTouchingLeft, isTouchingRight));
        /**
         * Dynamic disabled classes
         */
        var previousDisabledClass = (currentQueryPage === 1) ? disabledClassName : '';
        var nextDisabledClass = (currentQueryPage === totalPages) ? disabledClassName : '';
        return (preact_1.h("ul", { className: "as-pagination " + containerClassName },
            preact_1.h(NavigationComponent_1["default"], { isVisible: goFirstLast, classNames: "as-pagination__item as-pagination__item--first " + firstClassName + " " + previousDisabledClass, template: firstTemplate, handleClick: function () { return _this.handleClick(1); } }),
            preact_1.h(NavigationComponent_1["default"], { isVisible: true, classNames: "as-pagination__item as-pagination__item--previous " + previousClassName + " " + previousDisabledClass, template: previousTemplate, handleClick: function () { return _this.handleClick(currentQueryPage - 1); } }),
            spectre.map(function (page) { return (preact_1.h("li", { className: "as-pagination__item as-pagination__item--link " + itemClassName + " " + ((currentQueryPage === page) ? activeClassName : ''), onClick: function () { return _this.handleClick(page); } },
                preact_1.h(Template_1["default"], { template: itemTemplate, data: { page: page.toLocaleString('de-DE') } }))); }),
            preact_1.h(NavigationComponent_1["default"], { isVisible: true, classNames: "as-pagination__item as-pagination__item--next " + nextClassName + " " + nextDisabledClass, template: nextTemplate, handleClick: function () { return _this.handleClick(currentQueryPage + 1); } }),
            preact_1.h(NavigationComponent_1["default"], { isVisible: goFirstLast, classNames: "as-pagination__item as-pagination__item--last " + lastClassName + " " + nextDisabledClass, template: lastTemplate, handleClick: function () { return _this.handleClick(totalPages); } })));
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
