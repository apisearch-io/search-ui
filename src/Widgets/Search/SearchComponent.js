import { render } from 'preact';

export default class InputText {
    constructor({
        target = '',
        className = '',
        eventTrigger = 'keyup'
    }) {
        this.type = 'text';
        this.target = target;
        this.className = className;
        this.eventTrigger = eventTrigger;
    }
}