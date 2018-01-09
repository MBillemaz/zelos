const mongoose = require("mongoose");
const fs = require('fs');
const join = require('path').join;
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/projet');

const models = join(__dirname, 'app/models');

// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));

/* On charge les valeurs par défaults */
require(join(__dirname, 'app/utils/defaultData.js'))
