import React from "react";

const Row = props => (
    <div className={`row ${props.cls}`}>
    {props.children}
  </div>
  );
  
  export default Row;