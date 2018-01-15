const mongoose = require("mongoose");
module.exports.controller = function(app, models){
    for (var model in models) {
        models[model].exportControllerSearch(app);
    }
}
