'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Article Schema
 */

const AddressTypeSchema = new Schema({
    label: String
});

/**
 * Validations
 */

 // UserSchema.path('name').required(true, 'User name cannot be blank');
 // UserSchema.path('first_name').required(true, 'User first_name cannot be blank');


/**
 * Pre-remove hook
 */

AddressTypeSchema.pre('remove', function (next) {
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

AddressTypeSchema.methods = {
};

/**
 * Statics
 */

AddressTypeSchema.statics = {
};

mongoose.model('AddressType', AddressTypeSchema);
