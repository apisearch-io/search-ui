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
        const customProps = {
            placeholder: 'Write something...',
            autofocus: true,
            classNames: {
                container: 'custom-container-class',
                input: 'custom-input-class'
            }
        }

        const tree = shallow(<SimpleSearchComponent
            target={'#some-tagret'}
            {...customProps}
        />);

        expect(tree).toMatchSnapshot();
    });
    //
    // it('should do something', () => {
    //     const trigger = jest.fn();
    //     const tree = shallow(<SimpleSearchComponent
    //         target={'#some-tagret'}
    //         onInput={trigger}
    //     />);
    //
    //     tree.find('input').simulate('input', 'Some query text');
    //     expect(trigger).toHaveBeenCalled();
    // });
});