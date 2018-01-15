'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BaseModel = require(__dirname + '/baseModel.js');

class Address extends BaseModel {
  constructor() {
    super();
    this.setFields({
        number: Number,
        street: String,
        zip_code: String,
        city: String,
        country: String,
        email: String,
        phone: String,
        type: [{type: mongoose.Schema.ObjectId, ref: 'AddressType'}]
    });
  }
}
// export the class
module.exports = Address;
