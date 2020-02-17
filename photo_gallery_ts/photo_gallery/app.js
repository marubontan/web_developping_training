"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://mongo:27017:photos", { useNewUrlParser: true });
var ImageSchema = new mongoose.Schema({ address: String });
var Photo = mongoose.model("Image", ImageSchema);
var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
app.get("/", function (_, res) {
    Photo.find({}, function (err, photos) {
        if (err)
            throw err;
        res.render("home", { registeredImages: photos });
    });
});
app.get("/detail/:id", function (req, res) {
    Photo.findById(req.params.id, function (err, foundImage) {
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
var saveToDB = function (address) {
    var newImage = new Photo({ address: address });
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
