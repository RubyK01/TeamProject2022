var index = require("../views/index");
var assert = require("chai").assert;


describe('darklightTheme', function(){
  it("validTheme.", async function create(){
    var button = togglebutton{i};
	var toggleButton = true;
    var testResult = false;

    if(togglebutton){
      testResult = true;
    }
    else{
      testResult = false;
    }

    assert.equal(testResult,true)
  });

  it("Invalid theme.", async function create(){
    var togglebutton= "toggletheme";
    
    var testResult = false;

    if(togglebutton){
      assert.equal(testResult,true)
    }
    else{
      testResult = false;
    }

    assert.equal(testResult,false)
  });
});
