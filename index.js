const mongoose = require("mongoose");
const fs = require('fs');
const join = require('path').join;
const Schema = mongoose.Schema;
var express = require('express')
var app = express();
var bodyParser = require('body-parser');
// parse application/json
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/projet', {useMongoClient: true});

const models = join(__dirname, 'app/models');


// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));

// dynamically include routes (Controller)
fs.readdirSync('./app/controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./app/controllers/' + file);
      route.controller(app);
  }
});

/* On charge les valeurs par défaults */
require(join(__dirname, 'app/utils/defaultData.js'))





app.listen(3000);
