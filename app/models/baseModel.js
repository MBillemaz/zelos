'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pluralize = require('pluralize');

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
      this.findOne(condition, (err, result) => {
          return result ? callback(err, result) : this.create(condition, (err, result) => { return callback(err, result) })
      })
  },
  /**
   * findEnabled
   *
   * @param {Object} condition
   * @param {Function} callback
   * @param {Number} limit
   * @param {Number} offset
   * @api private
   */
  findEnabled : function findEnabled(condition, callback, limit = 10, offset = 0) {
    return this.findAll(Object.assign(condition, {disabled: false}), callback, limit, offset);
  },
  /**
   * findDisabled
   *
   * @param {Object} condition
   * @param {Function} callback
   * @param {Number} limit
   * @param {Number} offset
   * @api private
   */
  findDisabled : function findDisabled(condition, callback, limit = 10, offset = 0) {
    return this.findAll(Object.assign(condition, {disabled: true}), callback, limit, offset);
  },
  /**
   * findEnabled
   *
   * @param {Object} condition
   * @param {Function} callback
   * @param {Number} limit
   * @param {Number} offset
   * @api private
   */
  findAll : function findAll(condition, callback, _limit = 10, _offset = 0) {
    let limit = parseInt(_limit);
    let offset = parseInt(_offset);

    if (isNaN(limit)) { limit = 10 }
    if (isNaN(offset)) { offset = 0 }

    return this.find(condition)
      .skip(offset)
      .limit(limit)
      .exec(callback);
  }
}

class BaseModel {
  constructor() {
    this.route = '/' + pluralize(this.constructor.name).toLowerCase();
    this.name = this.constructor.name;
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
      console.log("[INFO] Export model : " + this.name);
      mongoose.model(this.name, schemaExport);
  }
}
// export the class
module.exports = BaseModel;
