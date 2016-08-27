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

    execute(target, ...payload) {
        Logger.log(this._listenerUid + ' listener execution begins');
        this._listenerSideEffectRoutine.apply(this._context, payload);
    }

    get listenerUid() {
        return this._listenerUid;
    }

    get listenerSideEffectRoutine() {
        return this._listenerSideEffectRoutine;
    }

}

export default Listener;