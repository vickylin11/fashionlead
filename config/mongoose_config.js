//database config
// username: vickylzy  password:21005293vicky
var mongoose = require('mongoose');
var dbUrl= 'mongodb://vickylzy:21005293vicky@ds143211.mlab.com:43211/myweb';
mongoose.connect(dbUrl, {useNewUrlParser : true}, (err) => {

    console.log("mongo db connection", err);

});