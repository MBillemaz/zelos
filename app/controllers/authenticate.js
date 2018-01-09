const mongoose = require("mongoose");
module.exports.controller = function(app){
  app.post('/authenticate', function(req, res, err) {

    if (typeof req.body.login != 'undefined' && typeof req.body.password != 'undefined'){
      var login = req.body.username;
      var password = req.body.password;
    }

    var User = mongoose.model("User");
    var user = User.findOne({login: login}, function(err, user){
      if (!user || req.body.password != user.password){
        res.status(401).json({message: "Bad login or password."});
      }
      else{
        res.status(200).json({message: "You are now connected."})
      }
    })
  });
}
