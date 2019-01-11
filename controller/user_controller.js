var express = require('express');
var User = require('../user_models/user');
var router = express.Router();
var md5 = require('md5')


router.get('/checkUname/:username',function(req, res){
   
    var u_name = req.params.username;

    User.findOne({
        u_name: u_name,
    },function (err, result) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: err.message
                })
            }
            if (result) {
                console.log(result)
                return res.status(200).json({
                    err_code: 1,
                    message: 'Username existed, please change to another username.'
                })
            }else{
                return res.status(200).json({
                    err_code: 0,
                    message: 'New username'
                })
            }
    })


})


router.post('/signup', function(req, res){
    // get request params
    //var user = new User(req.body)
    console.log(req.body)
    var user = new User();
    
    user.u_name = req.body.username;
    user.u_pw = req.body.password;
    user.u_address = req.body.address;
    user.u_email = req.body.email;
    
    user.u_pw = md5(md5(user.u_pw))
  
    User.findOne({
        u_name: user.u_name,
    },function (err, result) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: err.message
                })
            }
            if (result) {
                console.log(result)
                return res.status(200).json({
                    err_code: 1,
                    message: 'Username existed, please change to another username.'
                })
            }else{
            user.save()
            
              req.session.regenerate(function(err){
                    //req.session.userInfo = user.u_name;
                    req.session.userid = user._id;
                    console.log(req.session);
                     //console.log(req.session)
                    res.status(200).json({
                        err_code: 0,
                    message: 'signup success',
                    userId: user._id
                })
            })
            
           
        }
    })
})

router.post('/login', function(req, res){
    //get request params
    var user = new User();
    
    user.u_name = req.body.username;
    user.u_pw = req.body.password;
    
        User.findOne({
                u_name: user.u_name,
                u_pw: md5(md5(user.u_pw))
            },function (err, user) {
            if (err) { // error process
                return res.status(500).json({
                    err_code: 500,
                    message: err.message
                })
            }
            if (!user) { // no user
                return res.status(200).json({
                    err_code: 1,
                    message: 'Username or password is invalid.'
                })
            }
            req.session.regenerate(function(err){
                    //req.session.userInfo = user.u_name;
                    req.session.userid = user._id;
                    console.log(req.session);
                     //console.log(req.session)
                    res.status(200).json({
                        err_code: 0,
                    message: 'login success',
                    userId: user._id
                })
            })
           
              console.log(user);
                //     res.status(200).json({
                //         err_code: 0,
                //     message: 'login success',
                //     userId: user._id
                // })
        }
        )
 }) 

 router.delete('/clearSession',function (req,res) {
    req.session.destroy(function(err) {
        if(err){
            res.json({err_code: 2, message: 'log out failed'});
            return;
        }

         res.status(200).json({
            err_code:0,
            message:'log out success'
         })
    })

})         
        
    

module.exports = router;