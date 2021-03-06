"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("./model");
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var seedDB = require("./seed");
mongoose.connect("mongodb://mongo:27017:photos", { useNewUrlParser: true });
seedDB();
var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
app.get("/", function (_, res) {
    model_1.Photo.find({}, function (err, photos) {
        if (err)
            throw err;
        res.render("home", { registeredImages: photos });
    });
});
app.get("/detail/:id", function (req, res) {
    model_1.Photo.findById(req.params.id).populate("comments").exec(function (err, foundImage) {
        if (err) {
            throw err;
        }
        else {
            res.render("show", { image: foundImage });
        }
    });
});
app.post("/", function (req, res) {
    saveToDB(req.body.address);
    res.redirect("/");
});
app.get("/detail/:id/comments/new", function (req, res) {
    model_1.Photo.findById(req.params.id, function (err, photo) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("new.ejs", { photo: photo });
        }
    });
});
app.post("/detail/:id/comments", function (req, res) {
    var newComment = new model_1.Comment({ comment: req.body.comment });
    newComment.save(function (err, comment) {
        if (err) {
            throw err;
        }
        else {
            console.log("Saved comment");
            model_1.Photo.findById(req.params.id, function (photoErr, photo) {
                if (photoErr) {
                    throw photoErr;
                }
                else {
                    photo.comments.push(comment);
                    photo.save();
                    console.log("comment saved");
                }
            });
        }
    });
});
var saveToDB = function (address) {
    var newImage = new model_1.Photo({ address: address });
    newImage.save(function (err, _) {
        if (err) {
            throw err;
        }
        else {
            console.log("Saved address");
        }
    });
};
app.listen(3000, function () {
    console.log("App started");
});
