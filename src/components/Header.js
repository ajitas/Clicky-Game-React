import React from "react";
import "./style.css";

const Header = props => (
    <div className="row header">
        <div className="col-md-4 text-center">
             Clicky Game
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