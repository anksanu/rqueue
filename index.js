import RQueue from './lib/rq';


console.log('aa');
/**
 * options
 *
 */
export default function (options) {
    return new RQueue(options);
}