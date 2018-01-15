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
      name: 'user1',
      first_name: 'user1name',
      birth_date: new Date(1657, 01, 25),
      login: 'user1',
      password: '$2y$10$xJopALJrQVmSgF7PjPocvOWqNdPNTnp3/Knh8ELswEYDNxCet5QlC',
      groups: myGroup,
      addresses: myAddress
    }, (err, result) => {
      if (err) { throw err; }
    }
  );
}

loadGroup();
