require('./lib/string.js');

var _ = require('underscore'),
  fs = require('fs');

var objects = require('./example.json').objects,
  models = [];

for (var key in objects) {
  
  var model = {
    model_name: key,
    collection_name: key.toLowerCase().pluralize(),
    attributes: objects[key]
  };

  var form = {
    title: model.collection_name,
    model: model.model_name,
    fields: objects[key]
  }

  var routes = [];

  for (var attr in model.attributes) {
    var attribute = model.attributes[attr];
    var field = form.attributes[attr];

    delete field.required;
    delete field.type;
    delete field.ref;

    delete attribute.widget;
    delete attribute.label;
  }

  console.log(model);
  /*models.push(model);
  forms.push(form);*/
  var template_string = fs.readFileSync('./templates/model.tpl').toString();
  var template = _.template(template_string);
  console.log(template(model));

};

