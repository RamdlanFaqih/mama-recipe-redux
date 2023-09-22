import React from "react";
import axios from "axios";
import { registerAction } from "../../redux/reducer/registerSlice"
import { useDispatch, useSelector } from "react-redux";
import BgLeft from "../../Component/BgLeft/BgLeft";
import Form from "../../Component/Form/Form";
import Button from "../../Component/Button/Button";
import './register.css'


const Register = () => {
  const dispatch = useDispatch()
  const [data, setData] = React.useState({
    name: "",
    email_address: "",
    phone_number: "",
    password: "",
    verify_password: ""
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    dispatch(registerAction(({data})))
  }
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row align-items-center">
          <div id="left-section" className="col-sm-12 col-md-4 col-lg-6">
            <BgLeft />
          </div>
          <div id="right-section" className="col-sm-12 col-md-8 col-lg-6">
            <section id="register">
              <div className="welcome">
                <h2>Welcome</h2>
                <p>Log in into your excisting account</p>
              </div>
              <form onSubmit={handleSubmit}>
              <div className="wrapper-form">
                <Form
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  value={data.name}
                  onChange={handleChange}
                />
              </div>
              <div className="wrapper-form">
                <Form
                  label="Email Address"
                  name="email_address"
                  type="text"
                  placeholder="Email Address"
                  value={data.email_address}
                  onChange={handleChange}
                />
              </div>
              <div className="wrapper-form">
                <Form
                  label="Phone Number"
                  name="phone_number"
                  type="text"
                  placeholder="Phone Number"
                  value={data.phone_number}
                  onChange={handleChange}
                />
              </div>
              <div className="wrapper-form">
                <Form label="Password" name="password" type="text" placeholder="password" value={data.password} onChange={handleChange} />
              </div>
              <div className="wrapper-form">
                <Form label="Verify Password" name="verify_password" type="text" placeholder="verify password" value={data.verify_password} onChange={handleChange} />
              </div>
              <div className="button d-grid">
              <Button buttonName="Register Account" type="submit" text="Register Account" />
              </div>
              <div className="sign-up">
                <p>
                  Already Have account?<a href="#">Log In Here</a>
                </p>
              </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
