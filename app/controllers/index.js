module.exports.controller = function(app){
  app.get('/', function(req, res, err) {
      res.json({version: 1.1});
  });
}
