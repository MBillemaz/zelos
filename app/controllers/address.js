const mongoose = require("mongoose");
module.exports.controller = function (app) {

    app.get('/address/:id', function (req, res, err) {
        var Address = mongoose.model("Address");
        var addresses = Address.find({ _id: req.params.id }, function (err, resultat) {
            if (err) res.json(res);
            else res.json(resultat)
        });
    });

    app.post('/address', function (req, res, err) {
        var Address = mongoose.model("Address");
        Address.create(req.body, (err, result) => {
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

    app.patch('/address/:id', function (req, res, err) {
        var Address = mongoose.model("Address");
        var id = req.params.id;
        Address.findEnabled({ _id: id }, function (err, addresses) {
            if (err) res.status(400).json(err);
            else {
                var address = addresses[0];
                if (address.length == 0) res.status(400).send("Address doesn't exist");
                else {

                    Object.keys(req.body).forEach(param => {
                        if(!address[param]) res.status(400).send(param + " doesn't exist in address");
                        else{
                            address[param] = req.body[param];
                        }
                    })
                    address.save(function (error, updated) {
                        if (error) res.status(400).send("Can't modify address");
                        else res.status(201).send("Address modified");
                    })
                }
            }
        })
    })

    app.delete('/address/:id', function (req, res, err) {
        var id = req.params.id;
        if (!id) {
            res.statusCode = 400;
            res.send("Need group to delete");
        }
        else {
            var Address = mongoose.model("Address");
            Address.findByIdAndUpdate({ _id: id }, { disabled: true }, function (err) {
                if (err) {
                    res.statusCode = 400;
                    res.send(err);
                }
                else {
                    res.send("Address deleted");
                }
            })
        }
    });
}
