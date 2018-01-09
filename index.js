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
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    groups: [{type: mongoose.Schema.ObjectID, ref: 'Group'}],
    addresses: [{type: mongoose.Schema.ObjectID, ref: 'Address'}],
    status: {
        type: [{
            type: String,
            enum: ['prospect', 'customer']
        }],
        default: ['prospect']
    },
    createAt: {type: Date, default: Date.now()}
});

var User = mongoose.Model('User', UserSchema);

var AddressTypeSchema = new Schema({
    label: String
});

var AddressType = mongoose.Model('AddressType', AddressTypeSchema);

var AddressSchema = new Schema({
    number: Number,
    street: String,
    zip_code: String,
    city: String,
    country: String,
    email: String,
    phone: String,
    type: [{type: mongoose.SchemaType.ObjectID, ref: 'AddressType'}]
})

var Address = mongoose.Model('Address', AddressSchema);

var newAddressType = new AddressType({
    label: 'livraison'
});

newAddressType.save(function(err) {
    if (err) throw err;
})

var newAddress = new Address({
    number: 3,
    street: "bobby",
    zip_code: "01700",
    city: "Lyon",
    country: "Chine",
    email: "bob@mail.com",
    phone: "0649634976",
})

newAddress.save(function(err) {
    if (err) throw err;
})

var newUser = new User({
    name: 'tsointsoin',
    first_name: 'tagada',
    birth_date: new Date(1657, 01, 25),
    login: 'a',
    password: 'pouetpouet',
    addresses: newAddress
})

newUser.save(function(err) {
    if (err) throw err;
})