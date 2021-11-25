<template>
  <form class="section" @submit.prevent="login()">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
            <input class="input" type="text" placeholder="Email" v-model="email">
            <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
            </span>
        </p>
        </div>
        <div class="field">
        <p class="control has-icons-left">
            <input class="input" type="password" placeholder="Password" v-model="password">
            <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
            </span>
        </p>
        </div>
        <div class="field">
        <p class="control">
            <button class="button is-success">
            Login
            </button>
            <button class="button is-success" type="button" @click="loginGoogle">
            Login with Google
            </button>
        </p>
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
        </div>
  </form>
</template>

<script>
import Session from "../services/session";
export default {
    data: ()=>({
        email: null,
        password: null,
        Session
    }),
    methods: {
        login(){
            this.Session.Login(this.email, this.password);
        },
        loginGoogle(){
            auth.signIn().then(x=> {
                console.log({ x })
            })
        }
    }
}
    /* global gapi */
    let auth;
    const tag = document.createElement('script');
    tag.id = "google-auth-script";
    tag.src = 'https://apis.google.com/js/platform.js';

    document.head.append(tag);

    tag.onload = () => {
        gapi.load('auth2', function() {
            gapi.auth2.init({
                client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID
            }).then()
            .then(()=> {
                auth = gapi.auth2.getAuthInstance();
                
            })

        });
    }

</script>

<style>

</style>