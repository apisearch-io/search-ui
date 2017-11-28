/**
 * @jsx h
 */
import {h} from 'preact';
import {deep} from 'preact-render-spy';
import PaginationComponent from './../PaginationComponent';
import Template from '../../Template';

describe('<PaginationComponent />',() => {
    const defaultProps = {
        target: '#some-target',
        currentQuery: {
            page: 1,
            size: 10
        }
    };
    const customProps = {
        padding: 2,
        goFirstLast: true,
        classNames: {
            container: 'custom-container-class',
            item: 'custom-item-class',
            active: 'custom-active-class',
            disabled: 'custom-disabled-class',
            next: 'custom-next-class',
            first: 'custom-first-class',
            previous: 'custom-previous-class',
            last: 'custom-last-class'
        },
        template: {
            item: '{{page}}',
            next: 'Next -->',
            previous: '<-- Prev',
            first: '<| FIRST',
            last: 'LAST |>'
        }
    };
    const data = {
        total_hits: 1000
    };
    const emptyData = {
        total_hits: 0
    };

    it('should render with default props', () => {
        const tree = deep(
            <PaginationComponent
                {...defaultProps}
                data={data}
            />
        );

        /**
         * Testing the default props tree
         */
        expect(tree.component().props).toMatchSnapshot();
        /**
         * Testing rendered html
         */
        expect(tree).toMatchSnapshot();
    });
    it('should render with custom props', () => {
        const tree = deep(
            <PaginationComponent
                {...defaultProps}
                {...customProps}
                data={data}
            />
        );

        /**
         * Testing the default props tree
         */
        expect(tree.component().props).toMatchSnapshot();
        /**
         * Testing rendered html
         */
        expect(tree).toMatchSnapshot();
    });
    it('should not render if data is empty', () => {
        const tree = deep(
            <PaginationComponent
                {...defaultProps}
                data={emptyData}
            />
        );

        /**
         * Testing rendered html
         */
        expect(tree).toMatchSnapshot();
    });
    it('should handleClick() and and go NEXT', () => {
        const tree = deep(
            <PaginationComponent
                {...defaultProps}
                {...customProps}
                data={data}
            />
        );

        const mock = jest.fn();
        tree.find('.asui-pagination--next')[0].attributes.onClick = mock;
        tree.find('.asui-pagination--next').at(0).simulate('click', 2);

        tree.render(
            <PaginationComponent
                {...defaultProps}
                {...customProps}
                currentQuery={{
                    page: 2, size: 10
                }}
                data={data}
            />
        );

        /**
         * Expect onClick to be called
         */
        expect(mock).toBeCalled();

        /**
         * Testing rendered html
         */
        expect(tree).toMatchSnapshot();
    });
    it('should handleClick() and and go PREV', () => {
        const tree = deep(
            <PaginationComponent
                {...defaultProps}
                {...customProps}
                data={data}
            />
        );

        const mock = jest.fn();
        tree.find('.asui-pagination--previous')[0].attributes.onClick = mock;
        tree.find('.asui-pagination--previous').at(0).simulate('click', 1);

        tree.render(
            <PaginationComponent
                {...defaultProps}
                {...customProps}
                currentQuery={{
                    page: 1, size: 10
                }}
                data={data}
            />
        );

        /**
         * Expect onClick to be called
         */
        expect(mock).toBeCalled();

        /**
         * Testing rendered html
         */
        expect(tree).toMatchSnapshot();
    });
});