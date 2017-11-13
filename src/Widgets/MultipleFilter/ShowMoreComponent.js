/**
 * @jsx h
 */
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
    showLessTemplate
}) => {
    return (allItemsLength > currentLimit)
        ? (
            <div className={`asui-showMore ${showMoreContainerClassName}`}
                 onClick={handleShowMore}
            >
                <Template
                    template={showMoreTemplate}
                    className={`asui-showMore--more`}
                />
            </div>
        )
        : (allItemsLength === currentLimit)
            ? (
                <div className={`asui-showMore ${showMoreContainerClassName}`}
                     onClick={handleShowLess}
                >
                    <Template
                        template={showLessTemplate}
                        className={`asui-showMore--less`}
                    />
                </div>
            )
        : null
};

export default ShowMoreComponent;