let expect = require('chai').expect;
import EventDispatcher from '../src/EventDispatcher';

describe('EventDispatcher()', () => {
    const eventDispatcher = new EventDispatcher();

    it('should save an event on event stack when dispatching an event', () => {
        eventDispatcher.dispatch({
            eventId: 'something-has-happened',
            payload: 'bla bla bla'
        });

        expect(eventDispatcher).to.deep.equal({
            events: {
                'something-has-happened': 'bla bla bla'
            }
        });
    });

    it('should store a new event keeping the event stack immutable', () => {
        eventDispatcher.dispatch({
            eventId: 'another-thing-has-happened',
            payload: 'la la la'
        });

        expect(eventDispatcher).to.deep.equal({
            events: {
                'something-has-happened': 'bla bla bla',
                'another-thing-has-happened': 'la la la'
            }
        })
    });

    it('should remove an event on event listened and keeping the event store immutable', () => {
        eventDispatcher.on('something-has-happened', e => e);

        expect(eventDispatcher).to.deep.equal({
            events: {
                'another-thing-has-happened': 'la la la'
            }
        })
    });

    it('should execute a callback when listening an event', () => {
        eventDispatcher.on('another-thing-has-happened', e => {
            expect(e).to.be.equal('la la la');
        });
    })
});