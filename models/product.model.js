var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    name: String,
    image: String,
    description: String
});

var User = mongoose.model('User', productSchema, 'users');

module.exports = User;