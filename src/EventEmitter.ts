// var events = require('events');
import { EventEmitter } from 'events';

class EventEmitterClass extends EventEmitter {
    private static _instance: EventEmitterClass;

    constructor() {
        super();
        this.emit('ready');
    }

    public static get Instance() {
        // Do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    }

}

export const EventEmitterInstance = EventEmitterClass.Instance;

