/**
 * Created by ankit.agrawal on 27/08/16.
 */

import EBus from '../eBus';

const EBusInstance = new EBus();

EBusInstance.addListener({
    name: 'First Listener',
    event: 'First_Event',
    routine: function () {
        console.log('First Text Executed from First Listener for First Event');
    }
});

EBusInstance.addListener([{
    name: 'Second Listener',
    event: 'First_Event',
    routine: function () {
        console.log('First Text Executed from Second Listener for First Event');
    }
}, {
    name: 'Third Listener',
    event: 'First_Event',
    routine: function () {
        console.log('First Text Executed from Third Listener for First Event');
    }
}]);


EBusInstance.trigger('First_Event', 'First_Publisher', {temp: 'temp'});

EBusInstance.removeListener('First Listener', 'First_Event');

EBusInstance.trigger('First_Event', 'First_Publisher', {temp: 'temp'});