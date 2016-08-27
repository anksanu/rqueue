
const RQueue = require('lib/rq');



module.exports (function(options){
    return new RQueue(options);
})(options);