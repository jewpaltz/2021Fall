/*  B"H
*/
const express = require("express");
const model = require("../models/users");

const app = express.Router();

app
    .get("/", (req, res, next) =>{
        model.GetAll()
        .then(user=>{ 
            res.send(user);
        })
        .catch(next) 
    })
    .get("/:user_id", (req, res, next) =>{
         model.Get(req.params.user_id)
            .then(user=>{ 
                res.send(user);
            })
            .catch(next) 
    })
    .patch("/:user_id", (req, res, next) =>{

        model   .Update(req.params.user_id, req.body)
                .then( user=> res.send(user) )
                .catch(next) 

    })
    .delete("/:user_id", (req, res, next) =>{

        model   .Delete(req.params.user_id)
                .then( user=> res.send({ deleted: user }) )
                .catch(next) 

    })
    .post("/login", (req, res, next) =>{

        model.Login(req.body.handle, req.body.password)
            .then(user=>{ 
                res.send(user);
            })
            .catch(next) 

    })
    .post("/register", (req, res, next) =>{
        model.Add(req.body)
            .then(user=>{
                res.status(201).send(user);
            })
            .catch(next) 
    })
    .post("/seed", (req, res, next) =>{
        model.Seed()
            .then(user=>{
                res.status(201).send("Created");
            })
            .catch(next) 
    })

module.exports = app;