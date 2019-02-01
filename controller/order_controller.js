var express = require('express');
var Cart = require('../cart_models/cart');
var Order = require('../order_models/order');
var router = express.Router();


router.post('/order', function(req, res){

   var order = new Order(req.body)
   order.save() //Save the checkout items to the table of ORDER.
     //Delete the checkout items in the table of CART. 
     for(var i=0;i<req.body.cart_ids.length;i++){
     	Cart.findOneAndDelete({_id: req.body.cart_ids[i]}).then (function (err, result) {
             
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: err.message
                });
            }
            
            res.status(200).json({
                err_code: 0,
                message: "You have removed the item from shoppingcart successfully."
            });
    });
     }       
     res.status(200).json({
         err_code: 0,
         orderId: order._id,
         message: 'Place order successfully.'
        })

})


router.get('/orderList/:id', function(req,res){

    console.log(req.session);
     Order.find({
        _id: req.params.id,
    },function (err, result) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: err.message
                })
            }
            res.status(200).json(result)
    })

})


module.exports = router;