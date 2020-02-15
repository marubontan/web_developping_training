var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise
mongoose.connect("mongodb://mongo:27017:photos", { useNewUrlParser: true })

var ImageSchema = new mongoose.Schema({ address: String });
var Image = mongoose.model("Image", ImageSchema);

var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
    Image.find({}, (err, images) => {
        if (err) throw err;
        res.render("home", { registeredImages: images });
    });
})

app.get("/detail/:id", (req, res) => {
    Image.findById(req.params.id, (err, foundImage) => {
        if (err) {
            throw err;
        } else {
            res.render("show", { image: foundImage });
        }
    })
})

app.post("/", (req, res) => {
    saveToDB(req.body.address);
    res.redirect("/");
})


var saveToDB = function (address) {
    var newImage = new Image({ address: address });
    newImage.save((err, image) => {
        if (err) {
            throw err;
        } else {
            console.log("Saved address");
        }

    });
};

app.listen(3000, () => {
    console.log("App started");
})