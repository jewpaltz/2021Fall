import React from "react";
import { Route, Routes } from "react-router";
import Hero from "./components/Hero";
import Post from "./components/Post";
import session from "./services/session";


const About = ()=> <h1 className="title">Welcome to the About Page</h1>
const Home = ()=> <Hero title="Home Page" subtitle="The main page" />
const Feed = ()=> <Post post={ {
    src: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    user: session.user
 } } />
const Users = ()=> <Hero title="Users Page" subtitle="The list of users page" />


export default function OurRoutes(){
    return (
    <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/feed" element={ <Feed /> } />
        <Route path="/about" element={ <About /> } />
        <Route path="/login" element={ <Home /> } />
        <Route path="/users" element={ <Users /> } />
    </Routes>
    );
}