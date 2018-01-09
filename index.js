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

const dirModels = join(__dirname, 'app/models');

var models = {}


/* Dynamic export models */
fs.readdirSync(dirModels)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => {
    let tmpModel = new require(join(dirModels, file))
    models[tmpModel.constructor.name] = new tmpModel()
    models[tmpModel.constructor.name].exportModel()
  });

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
