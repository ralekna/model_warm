var model = {};

// assert.equals(['some', 'one', 'told'], Warm.tokenize(function(some, one, told) { me = some}).params, 'params should be parsed');

// console.log(Warm.tokenize(function(some, one, told) { me = some}).params);
// console.log(Warm.tokenize(function() { me = some }).params);

// console.log(Warm.tokenize(function(){ var some = {}; }).body);

console.log(Warm.tokenize(function() { me = some; var other = {meth:'hello'};
    other
        .meth
        .split('l');
    var some = 'ei'
    + 'ho'
    + 'hi'
}).body);

// console.log(Warm.tokenize(function(){}).body);

model.setOtherProp = Warm.createSetter(model, function(value){
  myProp.otherProp = value;
});


model.setOtherProp("Hello");

// assert.equals(model.myProp.otherProp, "Hello", 'Should be Hello');
