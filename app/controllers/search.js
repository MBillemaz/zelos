const mongoose = require("mongoose");
module.exports.controller = function(app){

  app.get('/users', function(req, res, err) {

    var offset = req.query.offset === undefined ? 0 : req.query.offset;
    var limit = req.query.limit === undefined ? 10 : req.query.limit;

    var User = mongoose.model("User");
    var query = User.find({}).skip(parseInt(offset)).limit(parseInt(limit));
    query.exec(function(err, result){
      if (err) res.json(err);
      else res.json(result);
    });
  });

}
