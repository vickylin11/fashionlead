var mongoose = require('mongoose');

// connect database
//mongoose.connect('mongodb://localhost/test', { useMongoClient: true })

var Schema = mongoose.Schema
// set user schema
var designerSchema = new Schema({
  d_name: {
    type: String,
    required: true
  },
  d_pic: {
    type: String,
    required: true
  },
  d_desc:{
  	type: String,
    required: true
  }

},
{ collection: 'designer' })

module.exports = mongoose.model('Designer', designerSchema)
