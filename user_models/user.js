var mongoose = require('mongoose');

// connect database
//mongoose.connect('mongodb://localhost/test', { useMongoClient: true })

var Schema = mongoose.Schema
// set user schema
var userSchema = new Schema({
  u_email: {
    type: String
    
  },
  u_name: {
    type: String,
    required: true

  },
  u_pw: {
    type: String,
    required: true
    
  },
  u_address:{
    type: String
   
  }
},
{ collection: 'user' })

module.exports = mongoose.model('User', userSchema)
