/** @jsx h */
import {h} from 'preact';
import {shallow, deep} from 'preact-render-spy';
import SortByComponent from './../SortByComponent';

describe('<SortByComponent />',() => {
    const defaultProps = {
        target: '#some-tagret',
        options: [
            {name: 'Oldest', value: 'year:asc'},
            {name: 'Newest', value: 'year:desc'}
        ]
    };

    it('should render with default props', () => {
        const tree = shallow(
            <SortByComponent {...defaultProps} />
        );

        expect(tree).toMatchSnapshot();
    });

    it('should render with custom props', () => {
        /**
         * Full custom props available object
         */
        const customProps = {
            classNames: {
                container: 'custom-container-class'
            }
        };

        const tree = shallow(
            <SortByComponent
                {...defaultProps}
                {...customProps}
            />
        );

        expect(tree).toMatchSnapshot();
    });

    it('should handleChange()', () => {
        const tree = shallow(
            <SortByComponent {...defaultProps} />
        );

        const trigger = jest.fn();
        tree.find('select')[0].attributes.onChange = trigger;
        tree.find('select').simulate('change');

        expect(trigger).toBeCalled();
    });
});