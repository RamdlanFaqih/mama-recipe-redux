import React from "react";
import Navigation from "../../Component/Navigation/Nav1";
import Footer from "../../Component/Footer/Footer";
import Button from "../../Component/Button/Button";
import style from "./detail.module.css";
import imgDetail from "../../assets/img/imgDetail.svg"

const DetailRecipe = () => {
  return (
    <div>
      <Navigation />
      <div className="container">
        <section id={style.allContent}>
          <div className="row align-items-center">
            <div className="col-12 text-center" id={style.titleContent}>
              <h1>Loream Sandwich</h1>
              <img
                src={imgDetail}
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="col-12" id={style.sectionIngredients}>
              <div className="container title-ingredients">
                <h1>Ingredients</h1>
              </div>
              <div className="container ingredients">
                <ul>
                  <li>2 Eggs</li>
                  <li>2 Tbsp Mayonaise</li>
                  <li>3 Slice Bread</li>
                  <li>A little Butter</li>
                  <li>⅓ carton of cress</li>
                  <li>
                    2-3 slices of tomato or a lettuce leaf and a slice of ham or
                    cheese
                  </li>
                  <li>crisps , to serve</li>
                </ul>
              </div>
            </div>
            <div className="col-12" id={style.videoStep}>
              <div className="container title-video">
                <h1>Video Step</h1>
              </div>
              <div className="container video-button">
                {Array(4)
                  .fill()
                  .map((_, i) => (
                    <div key={i} className="mt-3 d-grid">
                      <button type="button" className="btn btn-warning btn-lg">
                        <a href="#">
                          <img src="/assets/icon/play.svg" alt="" />
                        </a>
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            <div className="col-12" id={style.sectionComment}>
              <div className="container title-comment">
                <h1>Comment</h1>
              </div>
              <div className="container comment" id="comment-type">
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: "200px" }}
                  ></textarea>
                  <label htmlFor="floatingTextarea2">Comments</label>
                </div>
                <div className="d-grid mx-auto text-center" id={style.buttonSend}>
                  <button type="button" className="btn btn-warning text-light">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default DetailRecipe;
