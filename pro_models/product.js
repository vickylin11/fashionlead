var mongoose = require('mongoose');

// connect database
//mongoose.connect('mongodb://localhost/test', { useMongoClient: true })

var Schema = mongoose.Schema
// set user schema
var productSchema = new Schema({
  p_name: {
    type: String,
    required: true
  },
  p_price: {
    type: Number,
    required: true
  },
  p_describ: {
    type: String
  },
  p_categ: {
    type: String,
    required: true
  },
  p_stock: {
    type: [{"size":String,
    "quantity":Number}],
    required: true
  },
  p_pic: {
    type: [String]
  },
  p_designer: {
    type: String,
    required: true
  }

},
{ collection: 'product' })

module.exports = mongoose.model('Product', productSchema)
