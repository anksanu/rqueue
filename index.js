import RQueue from './lib/rq';

/**
 * options
 *
 */
import temp from './lib/eBus/tests/test1';

export default function (options) {
    return new RQueue(options);
}