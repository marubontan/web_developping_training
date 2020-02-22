"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var model_1 = require("./model");
var photos = new Map([
    ["pugOne", "https://uploads.metropoles.com/wp-content/uploads/2019/10/31144808/PIGS.jpg"],
    ["pugTwo", "https://www.greenme.com.br/wp-content/uploads/2017/06/pug-1200x800.jpg"]
]);
function seedDB() {
    model_1.Photo.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("removed photos");
            photos.forEach(function (v, k, m) {
                new model_1.Photo({ address: v }).save(function (err, photo) {
                    if (err) {
                        throw err;
                    }
                    else {
                        console.log("Saved address");
                        model_1.Comment.create({
                            comment: "fake comment"
                        }, function (err, comment) {
                            photo.comments.push(comment);
                            photo.save();
                            console.log("comment saved");
                        });
                    }
                });
            });
        }
    });
}
module.exports = seedDB;
