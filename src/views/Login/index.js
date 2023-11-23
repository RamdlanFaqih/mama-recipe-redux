import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/reducer/authSlice";
import BgLeft from "../../Component/BgLeft/BgLeft";
import "./app.css";
import Form from "../../Component/Form/Form";
import Button from "../../Component/Button/Button";

const Login = () => {
  const [data, setData] = React.useState({
    email_address: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();

    const userData = {
      email_address: data.email_address,
      password: data.password,
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/login`, userData)
      .then((response) => {
        console.log(response);
        localStorage.setItem(
          "token",
          JSON.stringify(response.data.generateToken)
        );
        localStorage.setItem("userID", response.data.userId);
        dispatch(loginSuccess(response.data.generateToken));
        setIsSuccess(true);
        setSuccessMessage("Login successful");
        setIsError(false);
        setErrorMessage("");
        return navigate("/");
      })
      .catch((err) => {
        console.log(err.errorMessage);
        setIsError(true);
        setErrorMessage("Please Try Again");
        setIsSuccess(false);
        setSuccessMessage("");
      });
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row align-items-center">
          <div id="left-section" className="col-sm-12 col-md-4 col-lg-6">
            <BgLeft />
          </div>
          <div id="right-section" className="col-sm-12 col-md-8 col-lg-6">
            <section id="login">
              <div className="welcome">
                <h2>Welcome</h2>
                <p>Log in into your existing account</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="wrapper-form">
                  <Form
                    label="Email"
                    name="email_address"
                    type="text"
                    placeholder="example@gmail.com"
                    value={data.email_address}
                    onChange={handleChange}
                  />
                </div>
                <div className="wrapper-form">
                  <Form
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="password"
                    value={data.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="check">

                  <label className="checkLabel my-2 " htmlFor="flexCheckDefault">
                    <input
                        className="checkInput"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                    />
                    I agree to terms & conditions
                  </label>
                </div>
                <div className="button d-grid">
                  <Button buttonName="Log In" type="submit" text="Log In" />
                  <a className="forgot" href="#">
                    Forgot Password ?
                  </a>
                </div>
                {isSuccess && (
                  <div className="alert alert-success" role="alert">
                    {successMessage}
                  </div>
                )}
                {isError && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}
              </form>
              <div className="sign-up">
                <p>
                  Don't Have an account?
                  <Link className="navLink ms-2" to="/register">
                     Register
                  </Link>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
