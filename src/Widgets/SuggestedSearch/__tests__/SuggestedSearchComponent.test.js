/** @jsx h */
import {h} from 'preact';
import {shallow} from 'preact-render-spy';
import SuggestedSearchComponent from './../SuggestedSearchComponent';

describe('<SuggestedSearchComponent />',() => {
    const defaultProps = {
        target: '#some-tagret'
    };

    it('should render with default props', () => {
        const tree = shallow(
            <SuggestedSearchComponent {...defaultProps} />
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
        /**
         * Full custom props available object
         */
        const customProps = {
            placeholder: 'Type to get suggestions...',
            autofocus: true,
            classNames: {
                container: 'custom-container-class',
                input: 'custom-input-class',
                box: 'custom-box-class',
                suggestion: 'custom-suggestion-class',
                activeSuggestion: 'custom-active-suggestion-class'
            }
        };

        const tree = shallow(
            <SuggestedSearchComponent
                {...defaultProps}
                {...customProps}
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
});