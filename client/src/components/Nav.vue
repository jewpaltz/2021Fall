<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="../assets/logo.png" height="28">
      <h3 class="title">Be Happy</h3>
    </a>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" :class="{'is-active': isActive }" @click="isActive = !isActive" >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div class="navbar-menu " :class="{'is-active': isActive }">
    <div class="navbar-start">
      <router-link class="navbar-item is-tab" to="/" active-class="is-active" exact>
        Home
      </router-link>

      <router-link class="navbar-item is-tab" to="/feed" active-class="is-active">
        Feed
      </router-link>

      <router-link class="navbar-item is-tab" to="/about" active-class="is-active">
        Documentation
      </router-link>

      <div class="navbar-item has-dropdown is-hoverable" >
        <a class="navbar-link" >
          More
        </a>

        <div class="navbar-dropdown">
          <router-link class="navbar-item is-tab" to="about" active-class="is-active">
            About
          </router-link>
          <a class="navbar-item">
            Jobs
          </a>
          <a class="navbar-item">
            Contact
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item">
            Report an issue
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <login-badge />
      </div>
    </div>
  </div>
</nav>

</template>

<script>
import LoginBadge from './LoginBadge';

export default {
    data(){
        return {
            isActive: false
        }
    },
    components: {
        LoginBadge,
    }
}
</script>

<style>

</style>