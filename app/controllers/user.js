const mongoose = require("mongoose");
module.exports.controller = function(app){
  app.get('/users', function(req,res,err){
      var User = mongoose.model("User");
      var users = User.find({}, function(err, resultat){
          if (err) res.json(res);
          else res.json(resultat)
      });

  });

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

  app.post('/delete', function(req,res,err){
    var user = req.body.user;
    var group = req.body.group;
    if (!user && !group){
        res.statusCode = 400;
        res.send("Need user or group to delete");
    }

    if(user) removeUser(user, res);

    if(group) removeGroup(group, res);
    
  });
}

function removeUser(userId, res){
    var User = mongoose.model("User");
    User.findByIdAndUpdate({_id: userId}, {disabled: true}, function (err, resu) {
        console.log(resu);
        if (err) {
            res.statusCode = 400;
            res.send(err);
        }
        else {
            res.send("User deleted");
        }
    })
    // User.findById(userId, function(err, user) {
    //     if (!err) {
    //         user.set({disabled: true});
    //         console.log(user);
    //         user.save(function (error, updated) 
    //         {
    //             if (error) {
    //                 res.statusCode = 400;
    //                 res.send(err);
    //             }
    //             else {
    //                 res.send("User deleted");
    //             }
    //         })        
    //     }
    //     else {
    //         res.statusCode = 400;
    //         res.send(err);
    //     }
    // });
}

function removeGroup(groupId, res){
    var Group = mongoose.model("Group");
    Group.findByIdAndUpdate({_id: groupId}, {disabled: true}, function (err) {
        if (err) {
            res.statusCode = 400;
            res.send(err);
        }
        else {
            res.send("Group deleted");
        }
    })
}
