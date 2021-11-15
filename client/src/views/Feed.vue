<template>
  <div class="section">
      <h1 class="title"> Feed Page </h1>
      
      <div class="columns">
        <div class="column is-one-third is-offset-one-third">
            
            <div class="post" v-for=" (p, i) in posts" :key="p.src">
                <post :post="p" @remove="remove(p, i)" />
            </div>


        </div>
      </div>


  </div>
</template>

<script>
import Post from '../components/Post.vue';
import session from "../services/session";
import { Delete, GetFeed } from "../services/posts";

export default {
    components: {
        Post
    },
    data: ()=> ({
        posts: []
    }),
    async mounted(){
        this.posts = await GetFeed(session.user.handle)
    },
    methods: {
        async remove(post, i){
            console.log({post})
            const response = await Delete(post.id)
            if(response.deleted){
                this.posts.splice(i, 1)
            }
        }
    }
}

</script>

<style>

</style>