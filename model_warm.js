var Warm = (function(){

  // first extract params array
  var FUNCTION_PARAMS_ARRAY_MATCHER = /^function [^\(]*\(\s*((:?(:?[^\s,]*)[\s,]*)*)\s*\)/;

  var INDIVIDUAL_PARAMS_MATCHER = /([A-Za-z_\$][A-Za-z_\$0-9]*)*/g;

  var FUNCTION_BODY_MATCHER = /^function [^\(]*\(.*\)[^\{]*\{([\w\W\n]*)\}$/i;

  function Warm() {
    
  }
  
  Warm.createSetter = function (target, method) {
    
    if (typeof  method != 'function') {
      throw Error('Method must be type of function');
    }

    // decompile
    
    var methodSource = method.toString();



  }
  
  return Warm;
  
})();
