/** @jsx h */
import {h} from 'preact';
import {deep} from 'preact-render-spy';
import ShowMoreComponent from './../ShowMoreComponent';

describe('<ShowMoreComponent />', () => {
    let initialProps = {
        handleShowMore: jest.fn(),
        handleShowLess: jest.fn(),
        showMoreContainerClassName: 'custom-container-class',
        showMoreTemplate: '<b>+ Show more</b>',
        showLessTemplate: '<b>+ Show less</b>'
    };

    it('should render Show More button when allItemsLength is bigger than currentLimit', () => {
        const tree = deep(
            <ShowMoreComponent
                {...initialProps}
                allItemsLength={3}
                currentLimit={2}
            />
        );
        expect(tree).toMatchSnapshot();
    });
    it('should render Show Less button when allItemsLength is equal to currentLimit', () => {
        const tree = deep(
            <ShowMoreComponent
                {...initialProps}
                allItemsLength={3}
                currentLimit={3}
            />
        );

        expect(tree).toMatchSnapshot();
    });
    it('should render nothing allItemsLength is smaller than currentLimit', () => {
        const tree = deep(
            <ShowMoreComponent
                {...initialProps}
                allItemsLength={1}
                currentLimit={3}
            />
        );

        expect(tree).toMatchSnapshot();
    })
});