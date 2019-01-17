var express = require('express');
var Designer = require('../pro_models/designer');
var router = express.Router();

router.get('/alldesigners', function(req, res){
             
             Designer.find(function (err, result) {
             
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: err.message
                })
            }
            console.log(result);
            res.status(200).json(result)
    })
})


router.get('/designer/:id',function(req, res){
   
    var d_id = req.params.id;

     Designer.find({
        _id: d_id,
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