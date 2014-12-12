var model = {};

model.setOtherProp = createPropertySetter(model, function(value){
  myProp.otherProp = value;
});


model.setOtherProp("Hello");

console.log(model.myProp.otherProp == "Hello");
