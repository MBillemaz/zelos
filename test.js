var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('./index.js');
var should = chai.should();

chai.use(chaiHttp);

describe('Users', function() {

  it('should create a user', function(done){
    chai.request(server)
    .post('/user')
    .send({
      'name': 'usertest',
      'first_name': 'userfirstnametest',
      'birth_date': 1515493872,
      'login': 'userlogintest',
      'password': 'userpasswordtest'})
    .end(function(err, res){
      res.should.have.status(201);
    })
  })

  it('should verify authenticate User', function(done) {

  chai.request(server)
    .post('/user')
    .send({
      'name': 'username',
      'first_name': 'userfirstname',
      'birth_date': 1515493872,
      'login': 'userlogin',
      'password': 'userpassword'})
      .end(function(err, res){

        chai.request(server)
          .post('/authenticate')
          .send({'login': 'userlogin', 'password': 'userpassword'})
          .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            done();
          });
      })

  });
});
