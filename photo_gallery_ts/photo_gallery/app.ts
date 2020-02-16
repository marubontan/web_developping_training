var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://mongo:27017:photos", { useNewUrlParser: true })

var ImageSchema = new mongoose.Schema({ address: String });
var Photo = mongoose.model("Image", ImageSchema);

var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");


app.get("/", (_: any, res: any) => {
    Photo.find({}, (err: Error, photos: any) => {
        if (err) throw err;
        res.render("home", { registeredImages: photos });
    });
})

app.get("/detail/:id", (req: any, res: any) => {
    Photo.findById(req.params.id, (err: Error, foundImage: any) => {
        if (err) {
            throw err;
        } else {
            res.render("show", { image: foundImage });
        }
    })
})

app.post("/", (req: any, res: any) => {
    saveToDB(req.body.address);
    res.redirect("/");
})


var saveToDB = function (address: String) {
    var newImage = new Photo({ address: address });
    newImage.save((err: Error, _: any) => {
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