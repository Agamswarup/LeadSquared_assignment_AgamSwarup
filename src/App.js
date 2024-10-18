import React from "react";
import "./App.css"; 
import Navbar from "./nav.js";
import Easy from "./easy.js";
import Medium from "./medium.js";
import Hard from "./hard.js";

const App = () => {
  return (
    <div className="appcontainer">
      <Navbar></Navbar>
      {/* There are 3 level of task (easy,medium,hard) */}
      <div className="task">
        <Easy></Easy>
        <Medium></Medium>
        <Hard></Hard>
      </div>
    </div>
  );
};

export default App;
