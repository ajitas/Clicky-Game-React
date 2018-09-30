import React from "react";

const Container = props => (
    <div className={`container ${props.cls}`}>
      {props.children}
    </div>
  );
  
  export default Container;