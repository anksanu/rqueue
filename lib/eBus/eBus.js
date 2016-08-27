/**
 * eBus is a JavaScript Event Pub Sub Bus
 * - Entities can attach a listener to an event
 * - Entities can publish events
 * - Entities can listen to events that happened in the past
 */

import EventClass from './models/event';
import ListenerClass from './models/listener';
import Logger from './logger';

class eBus {
    constructor(options) {
        this._eventListenerMap = new Map();
    }

    addListener(listenerPayload) {
        if (!(listenerPayload instanceof Array)) {
            listenerPayload = [listenerPayload];
        }

        for (let payloadObj of listenerPayload) {
            let event = payloadObj.event;
            let listenerObj = new ListenerClass(payloadObj.name, payloadObj.routine, payloadObj.context, listenerPayload.options);

            this._eventListenerMap.has(event) ? this._eventListenerMap.get(event).push(listenerObj) : this._eventListenerMap.set(event, [listenerObj]);
            Logger.log(payloadObj.name, ' listener is attached with ', event);
        }
    }

    removeListener(listenerName, eventName) {
        let listenersList = this._eventListenerMap.get(eventName);
        let updatedListnersList = [];

        for (let listener of listenersList) {
            if (listener.listenerUid != listenerName) {
                updatedListnersList.push(listener);
            }
        }
        this._eventListenerMap.set(eventName, updatedListnersList);
    }

    trigger(event, target, ...payload) {
        let listenersList = this._eventListenerMap.get(event);
        for (let listener of listenersList) {
            listener.execute.apply(listener, [target, payload]);
        }
    }
}

export default eBus;