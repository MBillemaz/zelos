const mongoose = require("mongoose");
module.exports.controller = function (app) {

    app.get('/group/:id', function (req, res, err) {
        var Group = mongoose.model("Group");
        var groups = Group.find({ _id: req.params.id }, function (err, resultat) {
            if (err) res.json(res);
            else res.json(resultat)
        });
    });

    app.post('/group', function (req, res, err) {
        var Group = mongoose.model("Group");
        Group.create(req.body, (err, result) => {
            if (err) {
                res.statusCode = 400;
                res.send(err);
            }
            else {
                res.statusCode = 201;
                res.send(result);
            }
        })
    });

    app.patch('/group/:id', function (req, res, err) {
        var Group = mongoose.model("Group");
        var id = req.params.id;
        var label = req.body.label;
        var desc = req.body.description;
        if(!label && !desc) res.status(400).send("Need good parameter (description or label)")
        Group.findEnabled({ _id: id }, function (err, groups) {
            var group = groups[0];
            if (err) res.status(400).json(err);
            else {
                if (group.length == 0) res.status(400).send("Group doesn't exist");
                else {
                    if (label) group.label = label;
                    if (desc) group.description = desc;
                    group.save(function (error, updated) {
                        if (error) res.status(400).send("Can't modify group");
                        else res.status(201).send("Group modified");
                    })
                }
            }
        })
    })

    app.delete('/group/:id', function (req, res, err) {
        var id = req.params.id;
        if (!id) {
            res.statusCode = 400;
            res.send("Need group to delete");
        }
        else {
            var Group = mongoose.model("Group");
            Group.findByIdAndUpdate({ _id: id }, { disabled: true }, function (err) {
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
