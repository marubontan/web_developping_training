import {Request, Response} from "express"
import {Photo} from "./model"
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const seedDB = require("./seed")


mongoose.connect("mongodb://mongo:27017:photos", { useNewUrlParser: true })
seedDB();

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");


app.get("/", (_: Request, res: Response) => {
    Photo.find({}, (err: Error, photos: any) => {
        if (err) throw err;
        res.render("home", { registeredImages: photos });
    });
})

app.get("/detail/:id", (req: Request, res: Response) => {
    Photo.findById(req.params.id, (err: Error, foundImage: any) => {
        if (err) {
            throw err;
        } else {
            res.render("show", { image: foundImage });
        }
    })
})

app.post("/", (req: Request, res: Response) => {
    saveToDB(req.body.address);
    res.redirect("/");
})


const saveToDB = function (address: String) {
    const newImage = new Photo({ address: address });
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