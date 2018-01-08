import { Schema } from 'mongoose';
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/projet');

var GroupSchema = new Schema({
    label: String,
    description: String
})

var Group = mongoose.Model('Group', GroupSchema);

var UserSchema = new Schema({
    name: {type: String, required: true},
    first_name: {type: String, required: true},
    birth_date: {type: Date, required: true},
    login: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    groups: [{type: mongoose.Schema.ObjectID, ref: 'Group'}]
});





