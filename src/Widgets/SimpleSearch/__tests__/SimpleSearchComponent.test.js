/** @jsx h */
import {h} from 'preact';
import {shallow} from 'preact-render-spy';
import SimpleSearchComponent from './../SimpleSearchComponent';

describe('<SimpleSearchComponent />',() => {
    it('should render with default props', () => {
        const tree = shallow(<SimpleSearchComponent
            target={'#some-tagret'}
        />);

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

        const tree = shallow(<SimpleSearchComponent
            target={'#some-tagret'}
            {...customProps}
        />);

        expect(tree).toMatchSnapshot();
    });
});