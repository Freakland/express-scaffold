var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var <% modelName %> = new Schema({
  <% for (var attribute in attributes) { %>
    <% attr %>
  <% } %>
}, {
  collectionName: <% collectionName %>
})

module.exports = mongoose.model('<%= modelName %>', <% modelName %>);
