import React from "react";
import "./button.css"
const Button = (props) => {
  return (
    <React.Fragment>
      <button type={props.type} className="btn btn-warning text-light">
      {props.buttonName}
    </button>
      
    </React.Fragment>
  );
};

export default Button;
