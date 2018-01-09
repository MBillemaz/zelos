const mongoose = require("mongoose");
const fs = require('fs');
const join = require('path').join;
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/projet');

const dirModels = join(__dirname, 'app/models');

var models = {}

// Bootstrap models
fs.readdirSync(dirModels)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => {
    let tmpModel = new require(join(dirModels, file))
    models[tmpModel.constructor.name] = new tmpModel()
  });

/* On charge les valeurs par défaults */
require(join(__dirname, 'app/utils/defaultData.js'))
