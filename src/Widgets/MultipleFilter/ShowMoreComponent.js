import { h } from 'preact';
import Template from "../Template";

/**
 * Show more component
 *
 * Provides two items
 *   -> Show more element
 *   -> Show less element
 */

const ShowMoreComponent = ({
    allItems,
    currentLimit,
    handleShowMore,
    handleShowLess,
    showMoreTemplate,
    showLessTemplate
}) => {
    return (allItems.length > currentLimit)
        ? (
            <div className={`asui-showMore`}
                 onClick={handleShowMore}
            >
                <Template
                    template={showMoreTemplate}
                    className={`asui-showMore--more`}
                />
            </div>
        )
        : (
            <div className={`asui-showMore`}
                 onClick={handleShowLess}
            >
                <Template
                    template={showLessTemplate}
                    className={`asui-showMore--less`}
                />
            </div>
        )
};

export default ShowMoreComponent;