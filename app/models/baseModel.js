'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const baseStructure = {
  disabled: {type: Boolean, default: false}
}

const baseMethods = {
}

const baseStatics = {
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
}

class BaseModel {
  constructor() {
    this.structure = Object.assign({}, baseStructure);
    this.methods = Object.assign({}, baseMethods);
    this.statics = Object.assign({}, baseStatics);
  }

  addField(key, params) {
    this.structure[key] = params;
  }
  getFields(key) {
    return this.structure[key];
  }
  removeField(key) {
    this.structure[key] = undefined;
  }
  setFields(structure) {
    this.structure = Object.assign(baseStructure, structure);
  }

  addMethod(name, _function) {
    this.methods[name] = _function;
  }
  getMethods(key) {
    return this.methods[key];
  }
  removeMethod(key) {
    this.methods[key] = undefined;
  }
  setMethods(methods) {
    this.methods = Object.assign(baseMethods, methods);
  }

  addStatic(name, _function) {
    this.statics[name] = _function;
  }
  getStatics(key) {
    return this.statics[key];
  }
  removeStatic(key) {
    this.statics[key] = undefined;
  }
  setStatics(statics) {
    this.statics = Object.assign(baseStatics, statics);
  }

  exportModel() {
    let schemaExport = new Schema(this.structure);
    schemaExport.methods = this.methods;
    schemaExport.statics = this.statics;
    console.log("Declare model name : " + this.constructor.name);
    mongoose.model(this.constructor.name, schemaExport);
  }

}
// export the class
module.exports = BaseModel;
