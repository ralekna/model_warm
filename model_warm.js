var Warm = (function(){

  // first extract params array
  var FUNCTION_PARAMS_ARRAY_MATCHER = /^function [^\(]*\(\s*([\w\W]*)\s*\)/;

  var INDIVIDUAL_PARAMS_SPLITTER = /\s*[,\n]\s*/;

  var FUNCTION_BODY_MATCHER = /^function [^\(]*\(.*\)[^\{]*\{\s*([\w\W\n]*)\s*\}$/i;

  var BODY_LINES_SPLITTER = /\s*[;\n]+\s*/;

  var LINE_STARTING_WITH_OPERATOR_MATCHER = /^[\.\+\-\\\*%]/;

  // Warn people when they do nonsense
  Warm.WARNINGS = true;
  Warm.ERRORS   = true;

  function Warm() {
    
  }

  function parseMethod (method) {
      // decompile

      var source = method.toString();

      var params; // = source.match(FUNCTION_PARAMS_ARRAY_MATCHER)[1].split(INDIVIDUAL_PARAMS_SPLITTER);




      var paramsBody = source.match(FUNCTION_PARAMS_ARRAY_MATCHER)[1];
      if (paramsBody && paramsBody.length) {
          params = paramsBody.match(INDIVIDUAL_PARAMS_SPLITTER);
      } else {
          params = [];
      }
      console.log('params',params);

      var body = source.match(FUNCTION_BODY_MATCHER)[1];

      if (!body) {
          if (Warm.WARNINGS) {
              throw new Error('Given function body is empty!');
          }
          return {
              params: params,
              body: []
          };
      }

      var lines = [];
      var rawLines = body.split(BODY_LINES_SPLITTER);

      console.log(rawLines);

      // iterate thought lines and join lines that was separated for beauty like:
      // var Some = { meth:'hello' };
      // Some
      //    .meth
      //    .split('l');
      //
      var linesIndex = 0;
      var rawLinesIndex = 0;
      var realCount = 0;
      while(rawLines[rawLinesIndex]) {
          realCount++;
          if (realCount > 10) {
              console.log(linesIndex, lines, rawLinesIndex, rawLines);
              break;
          }

          if (rawLines[rawLinesIndex].match(LINE_STARTING_WITH_OPERATOR_MATCHER)) {
              lines[linesIndex-1] = lines[linesIndex-1] + rawLines[rawLinesIndex];
          } else {
              lines[linesIndex] = rawLines[rawLinesIndex];
              linesIndex++;
          }
          rawLinesIndex++;

          if (realCount > 10) {
              console.log(linesIndex, lines, rawLinesIndex, rawLines);
          }

      }

      return {
          params: params,
          body: lines
      };

  }

  Warm.createSetter = function (target, method) {
    
    if (typeof  method != 'function') {
      throw new Error('Method must be type of function');
    }

    var methodStructure = parseMethod(method);


  };
  
  return {tokenize: parseMethod};
  
})();
