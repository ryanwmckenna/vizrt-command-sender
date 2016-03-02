var properties = /\[(.*)[\s\S]*?(?=[\[C])/g;
var propName = /\[(.+)\]/g;
var stripPropName = /[\[\s\]]/g;
var propDesc = /Desc[\s\S]*/g;
var stripPropDesc1 = /Description:/g;
var stripPropDesc2 = /------------/g;
var stripNewLines = /\n/g;

var log = function(obj){
  console.log(obj);
  return obj;
};

var projectProp = function(prop){

  var desc = R.compose(R.head, R.match(propDesc))(prop);

  return {
    name: R.compose(R.replace(stripPropName, ''), R.head, R.match(propName))(prop),
    description: desc ? R.compose(R.trim, R.replace(stripPropDesc2, ''), R.replace(stripPropDesc1, ''), R.replace(stripNewLines, ''))(desc) : ''
  };
};

var parseText = R.compose(log, R.map(projectProp), R.tail, R.match(properties));

$.get('raw_commands/MAIN.txt', parseText);