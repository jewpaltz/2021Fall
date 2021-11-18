/*  B"H
*/
const express = require("express");
const model = require("../models/users");
const friends = require("../models/friends");

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
    .post("/:follower/follow/:followee", (req, res, next) =>{

        friends.Follow(req.params.follower, req.params.followee)
            .then(response=>{
                if(response.modifiedCount){
                    res.send({ success: true });                    
                }else{
                    throw { code: 409, msg: "You are already following or trying to follow " + req.params.followee }
                } 
            })
            .catch(next) 

    })
    .delete("/:follower/follow/:followee", (req, res, next) =>{

        friends.UnFollow(req.params.follower, req.params.followee)
            .then(response=>{
                if(response.modifiedCount){
                    res.send({ success: true });                    
                }else{
                    throw { code: 404, msg: "You aren't following or trying to follow " + req.params.followee }
                } 
            })
            .catch(next) 

    })
    .patch("/:follower/approve/:followee", (req, res, next) =>{

        friends.Approve(req.params.follower, req.params.followee, req.body.shouldApprove)
            .then(response=>{
                if(response.modifiedCount){
                    res.send({ success: true });                    
                }else{
                    throw { code: 409, msg:  req.params.follower + " hasn't request to follow you." }
                } 
            })
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