
import React from "react";
import { NavLink } from "react-router-dom";
import '../style/homepage.css';

function HomePage() {
  return (
    <div id="homepageDiv">

      <div className="twitter-header">
        <NavLink className="homepageLinks" to="/login">
          LOG IN
        </NavLink>
        <NavLink className="homepageLinks" to="/signup">
          SIGN UP
        </NavLink>
      </div>

      <div className="twitter-content">
        <h1
          style={{
            textAlign: "left",
            padding: "0px 10px 10px 10px",
            fontSize: "4vw",
            fontFamily: "fantasy",
            width: "40%",
            color: "#1DA1F2",
            marginBottom: "20px",
            fontWeight: "800",
          }}
        > 
        WELCOME TO YOUR Todo List
        </h1>
        </div>
      </div>
  );
}

export default HomePage;