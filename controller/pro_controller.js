var express = require('express');
var Product = require('../pro_models/product');
var router = express.Router();

router.get('/api/shoes', function(req, res){
        
             Product.find({p_categ:"shoes"},function (err, result) {
             
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: err.message
                })
            }
           
            res.status(200).json(result)
    })
})


router.get('/designerPro/:id',function(req, res){
   
    var d_id = req.params.id;

    Product.find({
        p_designer: d_id,
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


router.get('/productDetail/:id',function(req, res){
   
    var p_id = req.params.id;

    Product.find({
        _id: p_id,
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