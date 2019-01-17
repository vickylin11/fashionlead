const express = require('express')
const app = express()
const mongoose = require ('./config/mongoose_config')
var session = require('express-session');
var FileStore = require('session-file-store')(session);
const user_controller = require ('./controller/user_controller')
const pro_controller = require ('./controller/pro_controller')
const designer_controller = require ('./controller/designer_controller')
const cart_controller = require ('./controller/cart_controller')
const order_controller = require ('./controller/order_controller')
const path = require('path');
// //database config
// // username: vickylzy  password:21005293vicky
// var mongoose = require('mongoose');
// var dbUrl= 'mongodb://vickylzy:21005293vicky@ds143211.mlab.com:43211/myweb';


// parse application/json
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, '/client/build')));



// mongoose.connect(dbUrl, {useNewUrlParser : true}, (err) => {

//     console.log("mongo db connection", err);

// });

const port = 8081

// app.get('/', function (req, res) {
//   // Cookies that have not been signed
//   console.log('Cookies: ', req.cookies)

//   // Cookies that have been signed
//   console.log('Signed Cookies: ', req.signedCookies)
//   res.send('Hello World!')
// })


app.use(session({
  name: 'userIdentification',
  secret: 'fashionlead',
  saveUninitialized: false,
  resave:false,
  cookie:{
    secure:false,
    maxAge:30*60*1000
  }
}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.use(user_controller);
app.use(pro_controller);
app.use(designer_controller);
app.use(cart_controller);
app.use(order_controller);
app.get("*", (req,res) =>{
    res.sendFile(path.join(__dirname,'/client/build/index.html'));
});



