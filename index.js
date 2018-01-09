const mongoose = require("mongoose");
const fs = require('fs');
const join = require('path').join;
const Schema = mongoose.Schema;
var express = require('express')
var app = express();
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/projet', {useMongoClient: true});

const models = join(__dirname, 'app/models');


// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));

/* On charge les valeurs par défaults */
require(join(__dirname, 'app/utils/defaultData.js'))

// parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res, err) {
    res.json({version: 1.0});
});

app.get('/users', function(req,res,err){
    var User = mongoose.model("User");
    var users = User.find({}, function(err, resultat){
        if (err) res.json(res);
        else res.json(resultat)
    });
    
})

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





app.listen(3000);
