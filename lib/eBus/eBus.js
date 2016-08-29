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

    /**
     * Attaches a listener to the eBus
     *
     * @param listenerPayload {object} Payload which will be needed to attach a listener to the eBus
     * listenerPayload : {
     *      name : <string>[Required],
     *      event : <string>[Required],
     *      routine : <function> [Required],
     *      context : <object> [Optional],
     *      options : <object> [Optional]
     * }
     */
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

    /**
     * Removes a listeners from the eBus
     *
     * @param listenerName {string}[Required] Uuid of the listner attaching context who want's to remove this listener.
     * @param eventName {string}[Required] Name of the event that need not to be listened any more.
     */
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

    /**
     * Triggers an event on the eBus making all the sideEffects to be executed for such event
     *
     * @param event {string} [Required] Name of the event that is published
     * @param target {string} [Optional] The Uuid of the publisher who is publishing the event.
     * @param payload {Array} [Optional] The payload that the event publisher would want to be passed to all the side effects.
     */
    trigger(event, target, ...payload) {
        let listenersList = this._eventListenerMap.get(event);
        for (let listener of listenersList) {
            listener.execute.apply(listener, [target, payload]);
        }
    }
}

export default eBus;