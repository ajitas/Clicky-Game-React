import React from "react";
import Row from "./Row";
import Col from "./Col";
import "./style.css";

const Header = props => (
    <Row cls="score">
        <Col size="md-4">
             <span className="scoreboard">ScoreBoard</span>
        </Col>
        <Col size="md-4">
            {props.message}
        </Col>
        <Col size="md-4">
            Score:{props.score} | Top Score:{props.highscore}
        </Col>
    </Row>
  );
  
  export default Header;