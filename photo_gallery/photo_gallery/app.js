var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://mongodb:27017/photo")

var ImageSchema = new mongoose.Schema({ address: String });
var Image = mongoose.model("Image", ImageSchema);

var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
    Image.find({}, (err, images)=>{
        if (err) throw err;
        res.render("home", { registeredPhotos: images });
    });
})

app.post("/", (req, res) => {
    saveToDB(req.body.address);
    res.redirect("/");
})

app.listen(3000, () => {
    console.log("App started");
})

var saveToDB = function(address){
    var newImage = new Image({ address: address });
    newImage.save((err, image) => {
        if (err) {
            throw err;
        } else {
            console.log("Saved address");
            console.log(image);
        }

    });
};
