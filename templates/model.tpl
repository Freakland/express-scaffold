var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var <% model_name %> = new Schema({
  <% _.each(attributes, function (value, key) { %>
    <% key %>:  {
      <% var last = _.last(value), lastKey = _.keys(last)[0];  %>
      <% _.each(value, function (v, k) { %>
        <% k %>: <% v %> <% if (k != lastKey) { %> , <% } %>
      <% }); %>
    },
    
  <% }); %>
  created_at: {
    type: Date,
    default: Date.now
  },

  updated_at: {
    type: Date
  }
}. {
  collectionName: '<% collection_name %>' 
});q

<% model_name %>.methods.update = function(data, next) {
  this.set(data);
  this.save(next);
}

<% model_name %>.pre('save', function(next) {
  var me = this;
  me.updated_at = Date.now();
  next();
});


module.exports = mongoose.model('<% model_name %>', <% model_name %>);
