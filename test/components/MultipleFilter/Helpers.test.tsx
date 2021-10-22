import {Filter, Query} from "apisearch";
import {expect} from "chai";
import {
    getFilterValuesFromQuery,
    getShadowFilterValuesFromQuery, isFilterAvailable, isLeveledFilter,
    wasElementRecentlySelected,
} from "../../../src/components/MultipleFilter/Helpers";

describe("Leveled filter", () => {

    it("Method getShadowFilterValuesFromQuery works properly", () => {

        expect(getShadowFilterValuesFromQuery(Query.createFromArray({}), "filter1", false)).to.be.deep.equal([]);
        expect(getShadowFilterValuesFromQuery(Query.createFromArray({}), "filter1", true)).to.be.deep.equal([]);
        expect(getShadowFilterValuesFromQuery(Query.createFromArray({
            filters: {},
        }), "filter1", true)).to.be.deep.equal([]);

        expect(getShadowFilterValuesFromQuery(Query.createFromArray({
            filters: {
                filterX: {
                    application_type: 4,
                    field: "x",
                    values: ["x1"],
                },
            },
        }), "filter1", true)).to.be.deep.equal([]);

        expect(getShadowFilterValuesFromQuery(Query.createFromArray({
            filters: {
                filterX: {
                    application_type: 6,
                    field: "x",
                    values: ["x1"],
                },
            },
        }), "filter1", true)).to.be.deep.equal([]);

        expect(getShadowFilterValuesFromQuery(Query.createFromArray({
            filters: {
                filterX: {
                    application_type: 6,
                    field: "x",
                    values: [],
                },
            },
        }), "filter1", true)).to.be.deep.equal([]);

        expect(getShadowFilterValuesFromQuery(Query.createFromArray({
            filters: {
                filterX: {
                    application_type: 6,
                    field: "indexed_metadata.x_level_1",
                    values: ["value1"],
                },
            },
        }), "filterX", true)).to.be.deep.equal(["value1"]);

        expect(getShadowFilterValuesFromQuery(Query.createFromArray({
            filters: {
                filterX: {
                    application_type: 6,
                    field: "indexed_metadata.x_level_1",
                    values: ["value1"],
                },
            },
        }), "filterX", false)).to.be.deep.equal([]);

        expect(getShadowFilterValuesFromQuery(Query.createFromArray({
            filters: {
                filterX: {
                    application_type: 6,
                    field: "indexed_metadata.x_level_2",
                    values: ["value2"],
                },
                x_level_1: {
                    field: "indexed_metadata.x_level_1",
                    values: ["value1"],
                },
            },
        }), "filterX", true)).to.be.deep.equal(["value1", "value2"]);

        expect(getShadowFilterValuesFromQuery(Query.createFromArray({
            filters: {
                filterX: {
                    application_type: 6,
                    field: "indexed_metadata.x_level_2",
                    values: ["value2"],
                },
                x_level_1: {
                    field: "indexed_metadata.x_level_1",
                    values: ["value1"],
                },
            },
        }), "filterX", false)).to.be.deep.equal(["value1"]);

        expect(getShadowFilterValuesFromQuery(Query.createFromArray({
            filters: {
                filterX: {
                    application_type: 6,
                    field: "indexed_metadata.x_level_3",
                    values: ["value3"],
                },
                x_level_1: {
                    field: "indexed_metadata.x_level_1",
                    values: ["value1"],
                },
                x_level_2: {
                    field: "indexed_metadata.x_level_1",
                    values: ["value2"],
                },
            },
        }), "filterX", true)).to.be.deep.equal(["value1", "value2", "value3"]);

        expect(getShadowFilterValuesFromQuery(Query.createFromArray({
            filters: {
                filterX: {
                    application_type: 6,
                    field: "indexed_metadata.x_level_3",
                    values: ["value3"],
                },
                x_level_1: {
                    field: "indexed_metadata.x_level_1",
                    values: ["value1"],
                },
                x_level_2: {
                    field: "indexed_metadata.x_level_1",
                    values: ["value2"],
                },
            },
        }), "filterX", false)).to.be.deep.equal(["value1", "value2"]);

        expect(getShadowFilterValuesFromQuery({
            filters: {
                filterX: {
                    applicationType: 6,
                    field: "indexed_metadata.x_level_3",
                    values: ["value3"],
                },
                x_level_1: {
                    field: "indexed_metadata.x_level_1",
                    values: ["value1"],
                },
                x_level_2: {
                    field: "indexed_metadata.x_level_1",
                    values: ["value2"],
                },
            },
        }, "filterX", false)).to.be.deep.equal(["value1", "value2"]);
    });

    it("Method isFilterAvailable works properly", () => {
        expect(isFilterAvailable(Query.createFromArray({}), "filter1")).to.be.false;
        expect(isFilterAvailable(Query.createFromArray({
            filters: {},
        }), "filter1")).to.be.false;
        expect(isFilterAvailable(Query.createFromArray({
            filters: [],
        }), "filter1")).to.be.false;

        expect(isFilterAvailable(Query.createFromArray({
            filters: {
                filter1000: {
                    applicationType: 6,
                    field: "indexed_metadata.x_level_3",
                    values: [],
                },
            },
        }), "filterX")).to.be.false;

        expect(isFilterAvailable(Query.createFromArray({
            filters: {
                filter1000: {
                    applicationType: 4,
                    field: "indexed_metadata.x_level_3",
                    values: [],
                },
            },
        }), "filterX", 6)).to.be.false;

        expect(isFilterAvailable(Query.createFromArray({
            filters: {
                filterX: {
                    application_type: 6,
                    field: "indexed_metadata.x_level_3",
                    values: ["LOL"],
                },
            },
        }), "filterX", 6)).to.be.true;

        expect(isFilterAvailable({
            filters: {
                filterX: {
                    applicationType: 6,
                    field: "indexed_metadata.x_level_3",
                    values: [],
                },
            },
        }, "filterX", 6)).to.be.true;

        expect(isFilterAvailable({
            filters: {
                filterX: {
                    applicationType: 6,
                    field: "indexed_metadata.x_level_3",
                    values: ["LOL"],
                },
            },
        }, "filterX", 6)).to.be.true;
    });

    it("Method getFilterValuesFromQuery works properly", () => {

        expect(getFilterValuesFromQuery(Query.createFromArray({}), "filter1")).to.be.deep.equal([]);
        expect(getFilterValuesFromQuery(Query.createFromArray({
            filters: {},
        }), "filter1")).to.be.deep.equal([]);

        expect(getFilterValuesFromQuery(Query.createFromArray({
            filters: {
                filterX: {
                    application_type: 6,
                    field: "indexed_metadata.x_level_3",
                    values: [],
                },
            },
        }), "filterX")).to.be.deep.equal([]);

        expect(getFilterValuesFromQuery(Query.createFromArray({
            filters: {
                filterX: {
                    application_type: 6,
                    field: "indexed_metadata.x_level_3",
                    values: ["value3"],
                },
            },
        }), "filterX")).to.be.deep.equal(["value3"]);

        expect(getFilterValuesFromQuery(Query.createFromArray({
            filters: {
                filterX: {
                    application_type: 6,
                    field: "indexed_metadata.x_level_3",
                    values: ["value3", "value10"],
                },
            },
        }), "filterX")).to.be.deep.equal(["value3", "value10"]);

        expect(getFilterValuesFromQuery({
            filters: {
                filterX: {
                    applicationType: 6,
                    field: "indexed_metadata.x_level_3",
                    values: ["value3", "value10"],
                },
            },
        }, "filterX")).to.be.deep.equal(["value3", "value10"]);

        expect(getFilterValuesFromQuery({
            filters: {
                filterX: {
                    applicationType: 6,
                    field: "indexed_metadata.x_level_3",
                    values: ["value3", "value10"],
                },
            },
        }, "filterX", 4)).to.be.deep.equal([]);

        expect(getFilterValuesFromQuery(Query.createFromArray({
            filters: {
                filterX: {
                    application_type: 6,
                    field: "indexed_metadata.x_level_3",
                    values: ["value3", "value10"],
                },
            },
        }), "filterX", 4)).to.be.deep.equal([]);
    });

    it("Method wasElementRecentlySelected works properly", () => {
        expect(wasElementRecentlySelected("item1", [])).to.be.true;
        expect(wasElementRecentlySelected("item1", ["item2"])).to.be.true;
        expect(wasElementRecentlySelected("item1", ["item1", "item2"])).to.be.false;
    });

    it("Method isLeveledFilter works properly", () => {
         expect(isLeveledFilter({
             application_type: 6,
             field: "indexed_metadata.x_level_3",
             values: ["value3", "value10"],
         })).to.be.true;

        expect(isLeveledFilter({
            applicationType: 6,
            field: "indexed_metadata.x_level_3",
            values: ["value3", "value10"],
        })).to.be.true;

        expect(isLeveledFilter(Filter.createFromArray({
            application_type: 4,
            field: "indexed_metadata.x_level_3",
            values: ["value3", "value10"],
        }))).to.be.false;

        expect(isLeveledFilter(Filter.createFromArray({
            applicationType: 4,
            field: "indexed_metadata.x_level_3",
            values: ["value3", "value10"],
        }))).to.be.false;
    });
});
