/** @jsx h */
import {h} from 'preact';
import {shallow} from 'preact-render-spy';
import SimpleSearchComponent from './../SimpleSearchComponent';

describe('<SimpleSearchComponent />',() => {
    const defaultProps = {
        target: '#some-tagret'
    };

    it('should render with default props', () => {
        const tree = shallow(
            <SimpleSearchComponent {...defaultProps} />
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
        }

        const tree = shallow(
            <SimpleSearchComponent
                {...defaultProps}
                {...customProps}
            />
        );

        expect(tree).toMatchSnapshot();
    });
    it('should handleSearch()', () => {
        const tree = shallow(
            <SimpleSearchComponent {...defaultProps} />
        );

        tree.find('input')[0].attributes.onInput = jest.fn()
        tree.find('input').simulate('input', 'this is a search query text');

        expect(
            tree.find('input').attr('onInput')
        ).toBeCalledWith('this is a search query text')
    });
});