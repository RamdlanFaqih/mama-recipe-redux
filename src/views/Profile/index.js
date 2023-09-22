import React from "react";
import axios from "axios";
import Navigation from "../../Component/Navigation/Nav1";
import Footer from "../../Component/Footer/Footer";
import Button from "../../Component/Button/Button";
import style from "./profile.module.css";

import ModalUpdate from "../../Component/modalUpdate/index";

const Profile = () => {
  const [user, setUser] = React.useState("");
  const userId = localStorage.getItem("userId")
  console.log(userId);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`);
        console.log(response.data.data.rows[0]);
        setUser(response.data.data.rows[0]);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <Navigation />
      <div className="container" id="allContent">
        <div className="row align-items-center">
          <div className="col-12 text-center" id="display-picture">
            <img src={user.image} className="img-fluid" alt="" />
            <ModalUpdate />
            <h1>{user.name}</h1>
          </div>
          <div className="col-12 text-center">
            <div className="accordion accordion-flush" id="accordionFlushExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    My Recipe
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    Placeholder content for this accordion, which is intended to
                    demonstrate the <code>.accordion-flush</code> class. This is
                    the first item's accordion body.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    Saved Recipe
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    Placeholder content for this accordion, which is intended to
                    demonstrate the <code>.accordion-flush</code> class.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    Liked Recipe
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    Placeholder content for this accordion, which is intended to
                    demonstrate the <code>.accordion-flush</code> class. This is
                    the third item's accordion body. Nothing more exciting
                    happening here in terms of content, but just filling up the
                    space to make it look, at least at first glance, a bit more
                    representative of how this would look in a real-world
                    application.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
