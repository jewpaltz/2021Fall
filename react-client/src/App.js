import React from "react";

import './App.css';
import Nav from "./components/Nav";
import { BrowserRouter } from "react-router-dom";
import OurRoutes from "./OurRoutes";

function App() {
  return (
      <BrowserRouter>
    <div className="App">

        <Nav />
        <OurRoutes />
        

    </div>
    </BrowserRouter>
  );
}

export default App;
