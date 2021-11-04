/*  B"H
*/
const express = require("express");
const model = require("../models/users");

const app = express.Router();

app
    .get("/", (req, res, next) =>{
        res.send(model.GetAll());
    })
    .get("/:user_id", (req, res, next) =>{
        res.send(model.Get(req.params.user_id));
    })
    .post("/login", (req, res, next) =>{
        model.Login(req.body.handle, req.body.password, (err, user)=>{
            if(err){
                next(err); return;
            }
            res.send(user);
        }); 
    })
    .post("/register", (req, res, next) =>{

        const user = req.body;

        model.Add(user, (err, user)=>{
            if(err){
                next(err); return;
            }
            res.status(201).send(user);
        }); 
    })
module.exports = app;