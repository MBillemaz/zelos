const mongoose = require("mongoose");
var hash = require('../helpers/hash.js');
module.exports.controller = function(app){
  app.post('/authenticate', function(req, res, err) {

    if (typeof req.body.login != 'undefined' && typeof req.body.password != 'undefined'){
      var login = req.body.login;
      var password = req.body.password;
    }

    console.log("login= " + login);

    var User = mongoose.model("User");
    var user = User.findEnabled({login: login}, function(err, user){
      console.log("hello! user=" + user);
      if (!user || !hash.comparePassword(password, user[0].password)){
        res.status(401).json({message: "Bad login or password."});
      }
      else{
        res.status(200).json({message: "You are now connected.", user: user[0]})
      }
    })
  });
}
