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
        const tree = getDirtyPaginationComponent({
            ...defaultProps,
            data: {...data}
        });

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
        const tree = getDirtyPaginationComponent({
            ...defaultProps,
            ...customProps,
            data: {...data}
        });

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
        const tree = getDirtyPaginationComponent({
            ...defaultProps,
            data: {...emptyData}
        });

        /**
         * Testing rendered html
         */
        expect(tree).toMatchSnapshot();
    });
    it('should handleClick() and and go NEXT', () => {
        let tree = getDirtyPaginationComponent({
            ...defaultProps,
            ...customProps,
            data: {...data}
        });

        const mock = jest.fn();
        tree.find('.asui-pagination--next')[0].attributes.onClick = mock;
        tree.find('.asui-pagination--next').at(0).simulate('click', 2);

        tree = updatePaginationComponent(tree, {
            ...defaultProps,
            ...customProps,
            data: {...data},
            currentQuery: { page: 2, size: 10 }
        });

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
        let tree = getDirtyPaginationComponent({
            ...defaultProps,
            ...customProps,
            data: {...data},
            currentQuery: { page: 4, size: 10 }
        });

        const mock = jest.fn();
        tree.find('.asui-pagination--previous')[0].attributes.onClick = mock;
        tree.find('.asui-pagination--previous').at(0).simulate('click', 3);

        tree = updatePaginationComponent(tree, {
            ...defaultProps,
            ...customProps,
            currentQuery: { page: 3, size: 10 },
            data: {...data}
        });

        /**
         * Expect onClick to be called
         */
        expect(mock).toBeCalled();

        /**
         * Testing rendered html
         */
        expect(tree).toMatchSnapshot();
    });
    it('should handleClick() and and go LAST', () => {
        let tree = getDirtyPaginationComponent({
            ...defaultProps,
            ...customProps,
            data: {...data},
        });

        const mock = jest.fn();
        tree.find('.asui-pagination--last')[0].attributes.onClick = mock;
        tree.find('.asui-pagination--last').at(0).simulate('click', 100);

        tree = updatePaginationComponent(tree, {
            ...defaultProps,
            ...customProps,
            currentQuery: { page: 100, size: 10 },
            data: {...data}
        });

        /**
         * Expect onClick to be called
         */
        expect(mock).toBeCalled();

        /**
         * Testing rendered html
         */
        expect(tree).toMatchSnapshot();
    });
    it('should handleClick() and and go FIRST', () => {
        let tree = getDirtyPaginationComponent({
            ...defaultProps,
            ...customProps,
            data: {...data},
            currentQuery: { page: 100, size: 10 }
        });

        const mock = jest.fn();
        tree.find('.asui-pagination--first')[0].attributes.onClick = mock;
        tree.find('.asui-pagination--first').at(0).simulate('click', 1);

        tree = updatePaginationComponent(tree, {
            ...defaultProps,
            ...customProps,
            currentQuery: { page: 1, size: 10 },
            data: {...data}
        });

        /**
         * Expect onClick to be called
         */
        expect(mock).toBeCalled();

        /**
         * Testing rendered html
         */
        expect(tree).toMatchSnapshot();
    });

    const getDirtyPaginationComponent = (props) => {
        return deep(
            <PaginationComponent
                dirty={true}
                {...props}
            />
        );
    };
    const updatePaginationComponent = (tree, props) => {
        tree.render(
            <PaginationComponent
                dirty={false}
                {...props}
            />
        );

        return tree;
    }
});