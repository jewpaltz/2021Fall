/*  B"H
*/
const express = require("express");
const model = require("../models/posts");

const app = express.Router();

app
    .get("/", (req, res, next) =>{
        model   .GetAll()
                .then( x=> res.send(x) )
                .catch(next) 
    })
    .get("/wall/:handle", (req, res, next) =>{
        model   .GetWall(req.params.handle)
                .then( x=> res.send(x) )
                .catch(next)    
    })
    .get("/feed/:handle", (req, res, next) =>{
        model   .GetFeed(req.params.handle)
                .then( x=> res.send(x) )
                .catch(next)    
    })
    .get("/search", (req, res, next) =>{
        model   .Search(req.query.q)
                .then( x=> res.send(x) )
                .catch(next)    
    })
    .get("/:id", (req, res, next) =>{
        model   .Get(req.params.id)
                .then( x=> res.send(x) )
                .catch(next)    
    })
    .post("/", (req, res, next) =>{
        model   .Add(req.body)
                .then( x=> res.status(201).send(x) )
                .catch(next)
    })
    .patch("/:id", (req, res, next) =>{
        model   .Update(req.params.id, req.body)
                .then( x=> res.send(x) )
                .catch(next) 
    })
    .delete("/:id", (req, res, next) =>{
        model   .Delete(req.params.id)
                .then( x=> res.send({ deleted: x }) )
                .catch(next) 
    })
    .post("/seed", (req, res, next) =>{
        model   .Seed()
                .then( x=> res.status(201).send("Created") )
                .catch(next)
    })
module.exports = app;