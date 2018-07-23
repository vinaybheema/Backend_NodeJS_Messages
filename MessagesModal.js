var mongoose = require('mongoose');

var schema = mongoose.Schema();

var msgSchema = new mongoose.Schema({
    name: String,
    message: String
});

module.exports = mongoose.model('Messages', msgSchema);