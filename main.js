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
    var attribute = _.extend({}, model.attributes[attr]);
    var field = _.extend({}, form.fields[attr]);

    delete field.required;
    delete field.type;
    delete field.ref;

    delete attribute.widget;

    model.attributes[attr] = attribute;
    form.fields[attr] = field;
  }
  /*models.push(model);
  forms.push(form);*/
  var template_string = fs.readFileSync('./templates/model.tpl').toString();
  var template = _.template(template_string);
  console.log(template(model));

};
