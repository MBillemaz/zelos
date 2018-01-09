'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Article Schema
 */

const AddressSchema = new Schema({
    number: Number,
    street: String,
    zip_code: String,
    city: String,
    country: String,
    email: String,
    phone: String,
    type: [{type: mongoose.Schema.ObjectId, ref: 'AddressType'}]
})

/**
 * Validations
 */

/**
 * Pre-remove hook
 */

AddressSchema.pre('remove', function (next) {
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

AddressSchema.methods = {
};

/**
 * Statics
 */

AddressSchema.statics = {
};

mongoose.model('Address', AddressSchema);
