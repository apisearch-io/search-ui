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
    allItemsLength,
    currentLimit,
    handleShowMore,
    handleShowLess,
    showMoreContainerClassName,
    showMoreTemplate,
    showLessTemplate,
    dictionary,
}) => {
    return (allItemsLength > currentLimit)
        ? (
            <div className={`as-showMore ${showMoreContainerClassName}`}
                 onClick={handleShowMore}
            >
                <Template
                    template={showMoreTemplate}
                    className={`as-showMore--more`}
                    dictionary={dictionary}
                />
            </div>
        )
        : (allItemsLength === currentLimit)
            ? (
                <div className={`as-showMore ${showMoreContainerClassName}`}
                     onClick={handleShowLess}
                >
                    <Template
                        template={showLessTemplate}
                        className={`as-showMore--less`}
                        dictionary={dictionary}
                    />
                </div>
            )
        : null;
};

export default ShowMoreComponent;
