const mongoose = require("mongoose");
const GroupModel = mongoose.model('Group');
const AddressTypeModel = mongoose.model('AddressType');
const AddressModel = mongoose.model('Address');
const UserModel = mongoose.model('User');

var myGroup = null;
var myAddress = null;

const loadGroup = () => {
  GroupModel.findOneOrCreate({
      label: 'administrateur',
      description: 'Les administrateurs'
    }, (err, result) => {
      if (err) { throw err; }
      myGroup = result;
      loadAdressType();
    }
  );
}

const loadAdress = (addressType) => {
  AddressModel.findOneOrCreate({
      number: 3,
      street: "bobby",
      zip_code: "01700",
      city: "Lyon",
      country: "Chine",
      email: "bob@mail.com",
      phone: "0649634976",
      type: addressType
    }, (err, result) => {
      if (err) { throw err; }
      myAddress = result;
      loadUser()
    }
  );
}

const loadAdressType = () => {
  AddressTypeModel.findOneOrCreate({
      label: 'livraison'
    }, (err, result) => {
      if (err) { throw err; }
      loadAdress(result)
    }
  );
}

const loadUser = () => {
  UserModel.findOneOrCreate({
      name: 'tsointsoin',
      first_name: 'tagada',
      birth_date: new Date(1657, 01, 25),
      login: 'a',
      password: 'pouetpouet',
      groups: myGroup,
      addresses: myAddress
    }, (err, result) => {
      if (err) { throw err; }
    }
  );
}

loadGroup();
