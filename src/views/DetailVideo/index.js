import React from "react";
import Navigation from "../../Component/Navigation/Nav1";
import Footer from "../../Component/Footer/Footer";
import Button from "../../Component/Button/Button";
import style from "./video.module.css";
import ThumbVid1 from "../../assets/img/thumbnail-vid1.svg"
import ThumbVid2 from "../../assets/img/thumbnail-vid2.svg"
const DetailVideo = () => {
  return (
    <div>
      <Navigation />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-8">
            <div className="main-video">
              <div className="video">
                <iframe
                  width="100%"
                  height="540"
                  src="https://www.youtube.com/embed/TcYCcXxMLfU?si=VGbonSaRiPV1Zm2b"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
                <div className="detailVideo">
                  <h1>
                    Cukup 1 Wajan! Resep GRILLED CHICKEN WITH MUSHROOM SAUCE
                    [Menu Valentine]
                  </h1>
                  <p>3 Month Ago</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-lg-4">
            <div className="anotherRecipe">
              <div className="thumbnail">
                <img src={ThumbVid1} alt="" />
              </div>
              <div className="detailContent">
                <h4>Beef Steak with Curry Sauce</h4>
                <p>Hana Lohana - 3 Month Ago</p>
              </div>
            </div>
            <div className="anotherRecipe">
              <div className="thumbnail">
                <img src={ThumbVid2} alt="" />
              </div>
              <div className="detailContent">
                <h4>Beef Steak with Curry Sauce</h4>
                <p>Hana Lohana - 3 Month Ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailVideo;
