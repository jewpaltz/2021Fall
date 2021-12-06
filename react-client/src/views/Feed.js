import Post from '../components/Post';
import session from "../services/session";
import { Add, Delete, GetFeed } from "../services/posts";
import { useEffect, useState } from 'react';
//import PostEdit from "../components/Post-edit.vue";

const createPost = ()=> ({ user: session.user, user_handle: session.user.handle })



const VM = {

    async mounted(){
        this.posts = await GetFeed(session.user.handle)
    },
    methods: {
        async remove(post, i){
            console.log({post})
            const response = await Delete(post._id)
            if(response.deleted){
                this.posts.splice(i, 1)
            }
        },
        async add(){
            console.log("Adding new post at " + new Date())
            const response = await Add(this.newPost);
            console.log({ response });

            if(response){
                this.posts.unshift(response);
                this.newPost = createPost();
            }
        }
    }
}

const card_style = {
    'margin-bottom': '10px'
}

export default function Feed(){

    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState(createPost());

    useEffect(()=>{ 
        GetFeed(session.user.handle).then(setPosts);
    }, []);

    return (

  <div class="section">
      <h1 class="title"> Feed Page </h1>
      
      <div class="columns">




        <div class="column is-half is-offset-one-quarter">

            <post-edit new-post="newPost" add="add()" />

            { posts.map((p, i)=> (
                <div class="post"  key={ p.src }>
                    <Post post={p} deletePost={()=> VM.methods.remove(p, i)} />
                </div>
            )) }
        </div>

        <div class="column">
            <Post post={newPost} />
        </div>
      </div>


  </div>
    )}