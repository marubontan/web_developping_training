import { Request, Response } from "express";
import express from "express";

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (_: Request, res: Response) => {
    res.render("home");
})

app.listen(3000, () => {
    console.log("Service started");
})
