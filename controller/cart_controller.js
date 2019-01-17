var express = require('express');
var Cart = require('../cart_models/cart');
var Product = require('../pro_models/product');
var router = express.Router();

router.post('/shoppingCart', function(req, res){
    var cart = new Cart()
    
    Product.find ({
                _id: req.body.proId
                 }
                 ,function (err,pro) {
                  
                    if (pro){
                     var p_stock = pro[0].p_stock
                     var currentStock = 0;
                      for(var i in p_stock){
                        if(req.body.selectedSize == p_stock[i].size){
                           currentStock = p_stock[i].quantity    
                        }
                        console.log(currentStock)
                      }
                      
                    Cart.find({
                         user_id: req.body.userId,
                         pro_id: req.body.proId,
                         pro_size: req.body.selectedSize
                     },function (err, result) {
                      
                        if (err) {
                             return res.status(500).json({
                             err_code: 500,
                             message: err.message
                             })
                        }
                 
                        if (result.length > 0) {
                             
                             var purchaseQuan = result[0].pro_quan + Number(req.body.selectedQuan);
                             console.log("hh"+purchaseQuan);
                             console.log("cartquan"+result[0].pro_quan);
                                 if (currentStock < purchaseQuan){
                                      return res.status(200).json({
                                             err_code: 1,
                                             message: "There is no enough stock for your required product."
                                             })
                      
                                  }else{

                                         Cart.findOneAndUpdate({_id: result[0]._id},{pro_quan:purchaseQuan}).then(function (result){
                                                  console.log(result)
                                         return res.status(200).json({
                                                err_code: 0,
                                                message: "Add to exist cart successfully."                             
                                                })

                                         })                
                                  }
                          }else{
                             console.log(currentStock)
                             if (currentStock >= req.body.selectedQuan){
                                  cart.user_id = req.body.userId;
                                  cart.pro_id = req.body.proId;
                                  cart.pro_size = req.body.selectedSize;
                                  cart.pro_quan = req.body.selectedQuan;
                                  cart.pro_name = req.body.product.p_name;
                                  cart.pro_price = req.body.product.p_price;
                                  cart.pro_pic = req.body.product.p_pic[0];
                                  cart.save()
                                 return res.status(200).json({
                                  err_code: 0,
                                  message: "Add to cart successfully."
                                })
                              }else{
                                   return res.status(200).json({
                                   err_code: 2,
                                   message: "out of stock."
                                  })
                              }

                             }       
                  })                     
                  }
              })
  })


router.get('/cartList',function(req,res){
  console.log(req.session)
  
  if(!req.session.userid){
    return res.status(200).json({
                err_code: 1,
                message: "Please login"
    });
  }
    Cart.find({user_id:req.session.userid},function (err, result) {
             
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: err.message
                })
            }
            res.status(200).json(result)
           
    })
   
})


router.delete('/removeItem/:id', function(req, res){
    console.log(req.params.id)
    Cart.findOneAndDelete({_id: req.params.id}).then (function (err, result) {
             
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: err.message
                });
            }
            
            res.status(200).json({
                err_code: 0,
                message: "You have removed the item successfully."
            });
    });
})


router.put('/updateQuantity/:id', function(req, res){
    console.log(req.params.id)
    console.log(req.body)

    Cart.findOneAndUpdate({_id: req.params.id},req.body).then(function (result) {

            res.status(200).json({
                err_code: 0,
                message: "You have updated the quantity successfully."
            });
    });
})

module.exports = router;