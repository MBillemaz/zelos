
const mongoose = require("mongoose");
module.exports.controller = function(app){

    app.delete('/group/delete/:id', function(req,res,err){
        var id = req.params.id;
        if (!id){
            res.statusCode = 400;
            res.send("Need group to delete");
        }
        else {
            var Group = mongoose.model("Group");
            Group.findByIdAndUpdate({_id: id}, {disabled: true}, function (err) {
                if (err) {
                    res.statusCode = 400;
                    res.send(err);
                }
                else {
                    res.send("Group deleted");
                }
            })
        }
    });
}