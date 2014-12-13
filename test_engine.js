/**
 * Created by rytis on 12/13/14.
 */
var Assert = (function() {

    function Assert() {

        // very private
        var failedAsserts = [];
        var passedAsserts = [];

        this.addPass = function(defaultMessage, params) {
            passedAsserts.push(formatLogEntry(defaultMessage, params));
        };

        this.addFail = function(defaultMessage, params) {
            failedAsserts.push(formatLogEntry(defaultMessage, params));
        };

        this.getFailedAsserts = function () {
            return failedAsserts.concat();
        };

        this.getPassedAsserts = function () {
            return passedAsserts.concat();
        };

    }

    function formatLogEntry(defaultMessage, params) {
        var paramsCopy = params.slice(0,2);
        var paramsClone = JSON.parse(JSON.stringify(paramsCopy));
        return defaultMessage + " Expected: " + JSON.stringify(paramsClone[0]) + ', got: ' + JSON.stringify(paramsClone[1]) + ' with message: ' + params[2];
    }

    Assert.prototype = {

        equals: function (expected, actual, message) {
            if (JSON.stringify(expected) === JSON.stringify(actual)) {
                this.addPass('Given objects equal', arguments);
            } else {
                this.addFail('Given objects not equal', arguments);
            }
        },
        is: function (expected, actual, message) {
            if (expected === actual) {
                this.addPass('Given objects are same', arguments);
            } else {
                this.addFail('Given objects are not same', arguments);
            }
        },
        notEqual: function (expected, actual, message) {
            if (JSON.stringify(expected) === JSON.stringify(actual)) {
                this.addFail('Given objects equal', arguments);
            } else {
                this.addPass('Given objects not equal', arguments);
            }
        },
        isNot: function (expected, actual, message) {
            if (expected === actual) {
                this.addFail('Given objects are same', arguments);
            } else {
                this.addPass('Given objects are not same', arguments);
            }
        }
    };

    return Assert;

})();

var TestRunner = (function(){

    function TestRunner() {

    }

    TestRunner.startSession = function () {
        window.assert = new Assert();
    };

    TestRunner.endSession = function() {
        var failedAsserts = window.assert.getFailedAsserts();
        var passedAsserts = window.assert.getPassedAsserts();

        console.log('Passed asserts: ' + passedAsserts.length);
        console.log('Failed asserts: ' + passedAsserts.length);

        for (var i = 0; i < failedAsserts.length; i++) {
            var obj = failedAsserts[i];
            console.error(obj);
        }
    };

    return TestRunner;

})();