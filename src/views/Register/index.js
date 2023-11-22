import React from "react";
import { registerAction, resetRegisterState } from "../../redux/reducer/registerSlice";
import { useDispatch, useSelector } from "react-redux";
import BgLeft from "../../Component/BgLeft/BgLeft";
import Form from "../../Component/Form/Form";
import Button from "../../Component/Button/Button";
import { useNavigate, Link } from "react-router-dom";
import "./register.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerState = useSelector((state) => state.register);
  const [data, setData] = React.useState({
    name: "",
    email_address: "",
    phone_number: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(registerAction({ data, navigate }));

    setTimeout(() => {
      dispatch(resetRegisterState());
    }, 3000)
  };
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
                <p>Your culinary journey begins here. <br/> Register to explore more.</p>
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
                  <input
                    className="checkInput"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label className="checkLabel" htmlFor="flexCheckDefault">
                    I agree to terms & conditions
                  </label>
                </div>
                <div className="button d-grid">
                  <Button
                    buttonName="Register Account"
                    type="submit"
                    text="Register Account"
                    path="#"
                  />
                </div>
                <div className="sign-up">
                  <p>
                    Already Have account?
                    <Link className="navLink" to="/login">
                    Log In Here
                  </Link>
                  </p>
                </div>
              </form>
              {registerState.isSuccess && (
                <div className="alert alert-success" role="alert">
                  {registerState.successMessage}
                </div>
              )}
              {registerState.isError && (
                <div className="alert alert-danger" role="alert">{registerState.errorMessage}</div>
              )}
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
