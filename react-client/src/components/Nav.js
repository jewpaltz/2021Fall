import React from "react";
//import LoginBadge from './LoginBadge';

export default function Nav() {

    const data = { isActive: false }

    return (
  <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="https://bulma.io">
      <img src="../assets/logo.png" height="28" />
      <h3 className="title">Be Happy</h3>
    </a>

    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" className="{'is-active': isActive }" click="isActive = !isActive" >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div className="navbar-menu " className="{'is-active': isActive }">
    <div className="navbar-start">
      <router-link className="navbar-item is-tab" to="/" active-className="is-active" exact>
        Home
      </router-link>

      <router-link className="navbar-item is-tab" to="/feed" active-className="is-active">
        Feed
      </router-link>

      <router-link className="navbar-item is-tab" to="/about" active-className="is-active">
        Documentation
      </router-link>

      <div className="navbar-item has-dropdown is-hoverable" >
        <a className="navbar-link" >
          More
        </a>

        <div className="navbar-dropdown">
          <router-link className="navbar-item is-tab" to="about" active-className="is-active">
            About
          </router-link>
          <a className="navbar-item">
            Jobs
          </a>
          <a className="navbar-item">
            Contact
          </a>
          <hr className="navbar-divider" />
          <a className="navbar-item">
            Report an issue
          </a>
        </div>
      </div>
    </div>

    <div className="navbar-end">
      <div className="navbar-item">
        <login-badge />
      </div>
    </div>
  </div>
</nav>

)}

