import React from "react";
import "./style.css";

const Header = props => (
    <div className="row score">
        <div className="col-md-4 text-center">
             <span className="scoreboard">ScoreBoard</span>
        </div>
        <div className="col-md-4 text-center">
            {props.message}
        </div>
        <div className="col-md-4 text-center">
            Score:{props.score} | Top Score:{props.highscore}
        </div>
    </div>
  );
  
  export default Header;