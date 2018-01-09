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
  /**
   * findOneOrCreate
   *
   * @param {Object} condition
   * @param {Function} callback
   * @api private
   */
  findOneOrCreate : function findOneOrCreate(condition, callback = (err, result) => {return result}) {
      const self = this
      self.findOne(condition, (err, result) => {
          return result ? callback(err, result) : self.create(condition, (err, result) => { return callback(err, result) })
      })
  }
};

mongoose.model('Address', AddressSchema);
