import React from "react";
import './form.css'

const Form = (props) => {
  return (
      <div>
        <label className="form-label">
          {props.label}
        </label>
        <input
          name={props.name}
          type={props.type}
          className="form-control"
          id="exampleFormControlInput1"
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
      </div>
  );
};

export default Form;
