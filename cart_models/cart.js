var mongoose = require('mongoose');

// connect database
//mongoose.connect('mongodb://localhost/test', { useMongoClient: true })

var Schema = mongoose.Schema
// set user schema
var cartSchema = new Schema({
  pro_id: {
    type: String,
    required: true
  },
  
  pro_quan: {
    type: Number,
    required: true
  },
  pro_size:{
    type: String
   
  },
  user_id:{
    type: String,
    required: true
  },
  pro_price:{
    type: Number 
  },
  pro_pic:{
    type: String 
  },
  pro_name:{
    type: String 
  }


  

},
{ collection: 'cart' })

module.exports = mongoose.model('Cart', cartSchema)
