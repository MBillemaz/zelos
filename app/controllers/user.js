const mongoose = require("mongoose");
module.exports.controller = function(app){
  app.get('/user/:id', function(req,res,err){
      var User = mongoose.model("User");
      var users = User.find({_id: req.params.id}, function(err, resultat){
          if (err) res.json(res);
          else res.json(resultat)
      });
  })

  app.post('/newUser', function(req,res,err){
      var User = mongoose.model("User");
      User.create(req.body, (err, result) => {
          if (err) {
              res.statusCode = 400;
              res.send(err);
          } // repondre 400
          else {
              res.statusCode = 201;
              res.send(result); // repondre 201
          }

      })

      // var newUser = new User();
      // Object.keys(req.body).forEach((param) => {
      //     User[param] = req.body[param];
      // })
      // console.log(newUser);
      // newUser.save(function(err) {
      //     if (err) throw err;
      // })

  })
}
