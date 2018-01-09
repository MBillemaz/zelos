'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Article Schema
 */

const UserSchema = new Schema({
    name: {type: String, required: true},
    first_name: {type: String, required: true},
    birth_date: {type: Date, required: true},
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    groups: [{type: mongoose.Schema.ObjectId, ref: 'Group'}],
    addresses: [{type: mongoose.Schema.ObjectId, ref: 'Address'}],
    status: {
        type: String,
        enum: ['prospect', 'customer'],
        default: 'prospect'
    },
    createAt: {type: Date, default: Date.now}
});

/**
 * Validations
 */

 // UserSchema.path('name').required(true, 'User name cannot be blank');
 // UserSchema.path('first_name').required(true, 'User first_name cannot be blank');


/**
 * Pre-remove hook
 */

UserSchema.pre('remove', function (next) {
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

UserSchema.methods = {
};

/**
 * Statics
 */

UserSchema.statics = {
};

mongoose.model('User', UserSchema);
