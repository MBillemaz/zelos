const mongoose = require("mongoose");
module.exports.controller = function(app, models){
    for (var model in models) {
        let modelClass = models[model];
        let route = '/search' + modelClass.route;
        console.log('[INFO] Export route search : GET ' + route)
        app.get(route, function(req, res, err) {
            var tmpModel = mongoose.model(modelClass.name);
            var query = tmpModel.findEnabled({}, function(err, result){
                if (err) res.json(err);
                else res.json(result);
            }, req.query.limit, req.query.offset);
        });
    }
}
