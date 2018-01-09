'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Article Schema
 */

const GroupSchema = new Schema({
    label: String,
    description: String
});

/**
 * Validations
 */

/**
 * Pre-remove hook
 */

GroupSchema.pre('remove', function (next) {
  // const imager = new Imager(imagerConfig, 'S3');
  // const files = this.image.files;

  // if there are files associated with the item, remove from the cloud too
  // imager.remove(files, function (err) {
  //   if (err) return next(err);
  // }, 'article');

  next();
});

/**
 * Methods
 */

GroupSchema.methods = {
};

/**
 * Statics
 */

GroupSchema.statics = {
};

mongoose.model('Group', GroupSchema);
