import React from "react";
import Post from '../components/Post';
import session from "../services/session";
import { Add, Delete, GetFeed } from "../services/posts";
import { useEffect, useState } from 'react';
//import PostEdit from "../components/Post-edit.vue";

const createPost = ()=> ({ user: session.user, user_handle: session.user.handle })





const card_style = {
    marginBottom: '10px'
}

export default function Feed(){

    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState(createPost());

    useEffect(()=>{ 
        GetFeed(session.user.handle).then(setPosts);
    }, []);

const VM = {

    methods: {
        async remove(post, i){
            console.log({post})
            const response = await Delete(post._id)
            if(response.deleted){
                setPosts(posts.filter((_,x)=> x != i));
            }
        },
        async add(){
            console.log("Adding new post at " + new Date())
            const response = await Add(newPost);
            console.log({ response });

            if(response){
                this.posts.unshift(response);
                this.newPost = createPost();
            }
        }
    }
}
    return (

  <div className="section">
      <h1 className="title"> Feed Page </h1>
      
      <div className="columns">




        <div className="column is-half is-offset-one-quarter">

            <post-edit new-post="newPost" add="VM.methods.add()" />

            { posts.map((p, i)=> (
                <div className="post" style={card_style}  key={ p.src }>
                    <Post post={p} deletePost={()=> VM.methods.remove(p, i)} />
                </div>
            )) }
        </div>

        <div className="column">
            <Post post={newPost} />
        </div>
      </div>


  </div>
    )}