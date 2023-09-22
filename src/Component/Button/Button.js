import React from "react";
import { useNavigate } from "react-router-dom";
import "./button.css"

const Button = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(props.path);
  };

  return (
    <button type={props.type} className="btn btn-warning text-light" onClick={handleClick}>
      {props.buttonName}
    </button>
  );
};

export default Button;
