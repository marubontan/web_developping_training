var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");

var registeredPhotos = [];

app.get("/", (req, res) => {
    res.render("home", {registeredPhotos: registeredPhotos});
})

app.post("/", (req, res) => {
    registeredPhotos.push(req.body.address);
    res.redirect("/");
})

app.listen(3000, () => {
    console.log("App started");
})
