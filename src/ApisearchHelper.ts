import {applySortByToQuery} from "./components/SortBy/SortByHelper";
import {FILTER_MUST_ALL, FILTER_TYPE_FIELD, MULTIPLY, Query, ScoreStrategies, ScoreStrategy} from "apisearch";

/**
 * ApisearchUI class
 */
export default class ApisearchHelper {

    /**
     * @param query
     * @param sort_by
     */
    public sortBy(
        query: Query,
        sort_by: string,
    ) {
        applySortByToQuery(query, sort_by);
    }

    /**
     * @param query
     * @param field
     * @param value
     * @param weight
     */
    public boostByWeightAndFilter(
        query: Query,
        field: string,
        value: any,
        weight: number,
    ) {
        const scoreStrategies = query.getScoreStrategies() ?? ScoreStrategies.createEmpty(MULTIPLY);
        scoreStrategies.addScoreStrategy(ScoreStrategy.createFromArray({
            "type": "weight",
            "weight": weight,
            "filter": {
                "field": field,
                "values": [value],
                "application_type": FILTER_MUST_ALL,
                "filter_type": FILTER_TYPE_FIELD,
            },
            "match_main_query": true,
        }));
        query.setScoreStrategies(scoreStrategies);
    }
}
