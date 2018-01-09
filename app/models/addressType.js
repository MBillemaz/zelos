'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BaseModel = require(__dirname + '/baseModel.js');

class AddressType extends BaseModel {
  constructor() {
    super();
    this.setFields({
      label: String
    });
  }
}
// export the class
module.exports = AddressType;
