var mongoose = require('mongoose');

// connect database
//mongoose.connect('mongodb://localhost/test', { useMongoClient: true })

var Schema = mongoose.Schema
// set user schema
var orderSchema = new Schema({
user_id:{
  type: String,
  required: true
},

order_date:{
  type: Date
},

order_items:{
  type:[{
    "pro_id": String,
    "pro_name": String,
    "pro_pic": String,
    "pro_quan": Number,
    "pro_size": String,
    "pro_price": Number
  }],
  required: true
},

order_total:{
  type: Number
},

cart_ids:{
  type:[String],
  required: true
}

},
{ collection: 'order' })

module.exports = mongoose.model('Order', orderSchema)