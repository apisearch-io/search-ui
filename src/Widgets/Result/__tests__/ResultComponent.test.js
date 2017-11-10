/** @jsx h */
import {h} from 'preact';
import {deep, shallow} from 'preact-render-spy';
import ResultComponent from './../ResultComponent';
import Template from '../../Template';

describe('<ResultComponent />',() => {
    const defaultProps = {
        target: '#some-target',
        template: {
            itemsList: `
                <ul>
                {{#items}} 
                    <li>{{metadata.name}}</li> 
                {{/items}}
                </ul>
            `
        }
    };
    const data = {
        items: [
            {
                metadata: {
                    name: 'Tony Stark',
                    img: 'https://api.marvel.com/v2/characters/tony-stark'
                }
            },
            {
                metadata: {
                    name: 'Peter Parker',
                    img: 'https://api.marvel.com/v2/characters/peter-parker'
                }
            }
        ]
    };

    it('should render with default props', () => {
        ResultComponent.prototype.componentWillMount = jest.fn();
        const tree = deep(
            <ResultComponent
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
        ResultComponent.prototype.componentWillMount = jest.fn();
        const customProps = {
            itemsPerPage: 20,
            highlightsEnabled: true,
            classNames: {
                container: 'custom-container-class'
            }
        };

        const tree = deep(
            <ResultComponent
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
    it('should show placeholder if is set in custom properties and ApisearchUI state is dirty', () => {
        ResultComponent.prototype.componentWillMount = jest.fn();
        const customProps = {
            template: {
                placeholder: 'This is the results placeholder, search something!'
            }
        };

        const tree = deep(
            <ResultComponent
                dirty={true}
                {...defaultProps}
                {...customProps}
            />
        );

        expect(tree).toMatchSnapshot();
    })
    it('should update content when passing new data', () => {
        const tree = deep(
            <ResultComponent
                {...defaultProps}
                data={data}
            />
        );

        const updatedDataProps = {
            items: [
                {
                    metadata: {
                        name: 'Robert Bruce Banner',
                        img: 'https://api.marvel.com/v2/characters/robert-bruce-banner'
                    }
                },
                {
                    metadata: {
                        name: 'Thor Odinson',
                        img: 'https://api.marvel.com/v2/characters/thor-odinson'
                    }
                }
            ]
        }
        tree.render(
            <ResultComponent
                {...defaultProps}
                data={updatedDataProps}
            />
        )

        expect(tree).toMatchSnapshot();
    });
});