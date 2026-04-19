import {
  Observable,
  isFunction
} from "./chunk-D5OIXA3B.js";

// node_modules/rxjs/dist/esm5/internal/observable/throwError.js
function throwError(errorOrErrorFactory, scheduler) {
  var errorFactory = isFunction(errorOrErrorFactory) ? errorOrErrorFactory : function() {
    return errorOrErrorFactory;
  };
  var init = function(subscriber) {
    return subscriber.error(errorFactory());
  };
  return new Observable(scheduler ? function(subscriber) {
    return scheduler.schedule(init, 0, subscriber);
  } : init);
}

export {
  throwError
};
//# sourceMappingURL=chunk-K46DBAHR.js.map
