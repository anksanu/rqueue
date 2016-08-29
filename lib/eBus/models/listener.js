import Logger from './../logger';

function validateConstructorParams(objUnderValidation) {
    let listenerUid = objUnderValidation[0],
        listenerSideEffectsRoutine = objUnderValidation[1],
        validationVerdict = true;

    if (!listenerUid) {
        Logger.error('listenerUid is not found');
        validationVerdict = false;
    }

    return validationVerdict;
}

class Listener {

    /**
     *
     * @param listenerUid
     * @param listenerSideEffectRoutine
     */
    constructor(listenerUid, listenerSideEffectRoutine, context, options) {
        if (!validateConstructorParams(arguments)) {
            return;
        }

        this._listenerUid = listenerUid;
        this._listenerSideEffectRoutine = listenerSideEffectRoutine;
        this._context = context;
    }

    /**
     * Executes the listener side effect routine.
     *
     * @param target {string} represents the uuid of the entity publishing this event
     * @param payload {object} The payload passed by the target which will be forwared to side effect routine
     * as param
     */
    execute(target, payload) {
        Logger.log(this._listenerUid + ' listener execution begins');
        this._listenerSideEffectRoutine.apply(this._context, payload);
    }

    /**
     * Getter Function to retrieve UUid of the context which added the listener
     *
     * @returns {string} The UUid of the listener adding context
     */
    get listenerUid() {
        return this._listenerUid;
    }

    /**
     * Getter Function to retrieve the sideEffect routine attached by the context during listener creation.
     *
     * @returns {Function} Retruns the sideEffect routine attached by the context
     */
    get listenerSideEffectRoutine() {
        return this._listenerSideEffectRoutine;
    }

}

export default Listener;