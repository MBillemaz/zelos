const mongoose = require("mongoose");
const fs = require('fs');
const join = require('path').join;
const Schema = mongoose.Schema;
var express = require('express')
var app = express();



mongoose.connect('mongodb://localhost/projet', {useMongoClient: true});

const models = join(__dirname, 'app/models');

// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));




app.get('/', function(req, res, err) {

});

app.get('/users', function(req,res,err){
    var User = mongoose.model("User");
    var users = User.find({}, function(err, resultat){
        if (err) res.send(res);
        else res.send(resultat)
    });
    
})

app.get('/user/:id', function(req,res,err){
    var User = mongoose.model("User");
    var users = User.find({_id: req.params.id}, function(err, resultat){
        if (err) res.send(res);
        else res.send(resultat)
    });
})

app.post('/newUser', function(req,res,err){
    var User = mongoose.model("User");
    var newUser = new User();
    console.log(req);
    Object.keys(req.body).forEach((param) => {
        User[param] = req.body[param];
    })
    
    newUser.save(function(err) {
        if (err) throw err;
    })
    res.send("user created");
})

app.listen(3000);

//   const Group = mongoose.model('Group');
//   var newGroup = new Group({
//       label: 'administrateur',
//       description: 'Les administrateurs'
//   });
  
//   newGroup.save(function(err) {
//       if (err) throw err;
//   })
  
//   const AddressType = mongoose.model('AddressType');
//   var newAddressType = new AddressType({
//       label: 'livraison'
//   });
  
//   newAddressType.save(function(err) {
//       if (err) throw err;
//   })
  
//   const Address = mongoose.model('Address');
//   var newAddress = new Address({
//       number: 3,
//       street: "bobby",
//       zip_code: "01700",
//       city: "Lyon",
//       country: "Chine",
//       email: "bob@mail.com",
//       phone: "0649634976",
//       type: newAddressType
//   })
  
//   newAddress.save(function(err) {
//       if (err) throw err;
//   })
  
//   const User = mongoose.model('User');
//   var newUser = new User({
//       name: 'tsointsoin',
//       first_name: 'tagada',
//       birth_date: new Date(1657, 01, 25),
//       login: 'b',
//       password: 'pouetpouet',
//       groups: newGroup,
//       addresses: newAddress
//   })
  
//   newUser.save(function(err) {
//       if (err) throw err;
//   })
  