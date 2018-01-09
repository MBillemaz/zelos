const mongoose = require("mongoose");
const fs = require('fs');
const join = require('path').join;
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/projet');

const models = join(__dirname, 'app/models');

// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));

const Group = mongoose.model('Group');
var newGroup = new Group({
    label: 'administrateur',
    description: 'Les administrateurs'
});

newGroup.save(function(err) {
    if (err) throw err;
})

const AddressType = mongoose.model('AddressType');
var newAddressType = new AddressType({
    label: 'livraison'
});

newAddressType.save(function(err) {
    if (err) throw err;
})

const Address = mongoose.model('Address');
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

const User = mongoose.model('User');
var newUser = new User({
    name: 'tsointsoin',
    first_name: 'tagada',
    birth_date: new Date(1657, 01, 25),
    login: 'a',
    password: 'pouetpouet',
    groups: newGroup,
    addresses: newAddress
})

newUser.save(function(err) {
    if (err) throw err;
})
