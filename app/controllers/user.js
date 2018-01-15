const mongoose = require("mongoose");
var hash = require('../helpers/hash.js');
module.exports.controller = function(app){

  app.get('/user/:id', function(req,res,err){
      var User = mongoose.model("User");
      var users = User.find({_id: req.params.id}, function(err, resultat){
          if (err) res.json(res);
          else res.json(resultat)
      });
  });

  app.post('/user', function(req,res,err){
      var User = mongoose.model("User");
      req.body.password = hash.hashPassword(req.body.password);
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

  app.patch('/user/:id', function(req,res,err){
      var id = req.params.id;
      var idGroup = req.body.group;
      var Group = mongoose.model("Group");
      var User = mongoose.model("User");

      Group.findOne({_id: idGroup}, function(err, group){
        if (err) res.status(400).json(err);
        else{
            if(group.disabled) res.status(400).send("Ce groupe est désactivé");
            else{
                User.findByIdAndUpdate({_id: id}, {$push: {groups: group}}, function(error, resu){
                    if (error) res.status(400).send(err);
                    else {
                        console.log(resu);
                        res.status(201).send("Group added to user");
                    }
                });
            }
        }
      })
  })

  app.delete('/user/:id', function(req,res,err){
    var id = req.params.id;
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
