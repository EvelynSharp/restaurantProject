const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Restaurant = new Schema ({
  restName: {type: String, required:true, unique:true},
  cuisine: {type: String, required:true},
  ratings: {type: Array, required:true}
});

module.exports = mongoose.model('Restaurant', Restaurant)
