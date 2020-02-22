export {};
const mongoose = require("mongoose");
let Photo = require("./model");

function seedDB(): void{
    Photo.remove({}, function(err: Error){
        if(err){
            console.log(err);
        } else {
            console.log("removed photos");
        }
    })
}

module.exports = seedDB;