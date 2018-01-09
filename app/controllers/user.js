const mongoose = require("mongoose");
module.exports.controller = function(app){

  app.get('/user/:id', function(req,res,err){
      var User = mongoose.model("User");
      var users = User.find({_id: req.params.id}, function(err, resultat){
          if (err) res.json(res);
          else res.json(resultat)
      });
  });

  app.post('/newUser', function(req,res,err){
      var User = mongoose.model("User");
      User.create(req.body, (err, result) => {
          if (err) {
              res.statusCode = 400;
              res.send(err);
          }
          else {
              res.statusCode = 201;
              res.send(result);
          }

      })
  });

  app.delete('/user/delete', function(req,res,err){
    var id = req.body.id;
    if (!id){
        res.statusCode = 400;
        res.send("Need user id to delete");
    }
    else {
        var User = mongoose.model("User");
        User.findByIdAndUpdate({_id: id}, {disabled: true}, function (err, resu) {
            console.log(resu);
            if (err) {
                res.statusCode = 400;
                res.send(err);
            }
            else {
                res.send("User deleted");
            }
        })
    }

  });
}
