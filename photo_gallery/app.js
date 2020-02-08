var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine","ejs")

app.get("/", (req, res)=>{
    res.render("home.ejs");
})

app.listen(3000, ()=>{
    console.log("App started");
})
