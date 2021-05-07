import { expect } from 'chai';
import Translate from "../../src/components/Translate";

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
});
