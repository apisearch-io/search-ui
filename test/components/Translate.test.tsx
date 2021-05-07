import { expect } from 'chai';
import {h} from "preact";
import Template from "../../src/components/Template";
import Translate from "../../src/components/Translate";
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';
require('jsdom-global')();
configure({ adapter: new Adapter });

describe('Translate', () => {

    it('Should translate simple messages', () => {
        expect(Translate.trans('Simple text', {})).to.be.equal('Simple text');
        expect(Translate.trans('', {})).to.be.equal('');
        expect(Translate.trans('_key_', {})).to.be.equal('_key_');
        expect(Translate.trans('_key_', {
            '_key_': 'Translated key'
        })).to.be.equal('Translated key');
    });

    it('Should translate JSON structres', () => {
        expect(Translate.trans('{Simple text}', {})).to.be.equal('{Simple text}');
        expect(Translate.trans('{"Simple text"}', {})).to.be.equal('{"Simple text"}');
        expect(Translate.trans('["Simple text"]', {})).to.be.equal('Simple text');
        expect(Translate.trans('["Simple $1", "text"]', {})).to.be.equal('Simple text');
        expect(Translate.trans('["Simple $1 and $2", "text", "yet"]', {})).to.be.equal('Simple text and yet');
    });

    it('Should translate JSON structres and translations', () => {
        expect(Translate.trans('["_simple_", "text", "yet"]', {
            "_simple_" : "Simple $1 and $2",
        })).to.be.equal('Simple text and yet');

        expect(Translate.trans('["_simple_", "text", "yet"]', {
            "_simple_" : "Simple $1 and $2",
            "_simple" : "Another",
            "simple_" : "Another",
            " _simple_" : "Another",
            "_simple_ " : "Another",
            "_SIMPLE_" : "Another",
            "_another_" : "Another",
        })).to.be.equal('Simple text and yet');
    });

    it('Should work properly the component', () => {
        let wrapper = mount(<Template
            template={"Template 1"}
        />);

        expect(wrapper.text()).to.be.equal('Template 1');

        wrapper = mount(<Template
            template={"Template {{#trans}}_template_id_{{/trans}}"}
            dictionary={{_template_id_: "1234"}}
        />);

        expect(wrapper.text()).to.be.equal('Template 1234');

        wrapper = mount(<Template
            template={"Template {{#trans}}_template_id_{{/trans}}"}
            dictionary={{_template_id_: "{{key1}}"}}
            data={{key1: "val1"}}
        />);

        expect(wrapper.text()).to.be.equal('Template val1');
    });
});
