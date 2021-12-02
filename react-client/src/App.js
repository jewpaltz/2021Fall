import React from "react";
import logo from './assets/logo.svg';
import './App.css';
import Nav from "./components/Nav";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
    <div className="App">

        <Nav />
        <section className="hero is-medium is-link">
            <div className="hero-body">
                <p className="title">
                    Medium hero
                </p>
                <p className="subtitle">
                    Medium subtitle
                </p>
            </div>
        </section>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    </BrowserRouter>
  );
}

export default App;
