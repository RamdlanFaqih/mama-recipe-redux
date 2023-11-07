import React, { useEffect, useState } from "react";
import Navigation from "../../Component/Navigation/Nav1";
import Footer from "../../Component/Footer/Footer";
import Button from "../../Component/Button/Button";
import style from "./detail.module.css";
import imgDetail from "../../assets/img/imgDetail.svg";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa6";

const DetailRecipe = () => {
  const { recipes_id } = useParams();
  const [recipes, setRecipes] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(recipes_id);
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/recipes/${recipes_id}`
        );
        console.log(response.data.data.rows);
        setRecipes(response.data.data.rows[0]);
      } catch (error) {
        console.log("Failed to get recipes:", error);
      }
    };

    fetchRecipes();
  }, [recipes_id]);

  const handleVideo = () => {
    console.log("handleVideo is called");
    navigate(`/DetailVideo/${recipes_id}`);
  };
  

  return (
    <div>
      <Navigation />
      <div className="container">
        <section id={style.allContent}>
          <div className="row align-items-center">
            <div className="col-12 text-center" id={style.titleContent}>
              <h1>{recipes.food_name}</h1>
              <img src={recipes.image} className="img-fluid" alt="" />
            </div>
            <div className="col-12" id={style.sectionIngredients}>
              <div className="container title-ingredients">
                <h1>Ingredients</h1>
              </div>
              <div className="container ingredients">
                <ul>{recipes.ingredients}</ul>
              </div>
            </div>
            <div className="col-12" id={style.videoStep}>
              <div className="container title-video">
                <h1>Video Step</h1>
              </div>
              <div className="container video-button">
                <div className="mt-3 d-grid">
                  <button type="button" className="btn btn-warning btn-lg" onClick={() => handleVideo()}>
                    <FaPlay color="#fff" size={30} />
                  </button>
                </div>
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
                <div
                  className="d-grid mx-auto text-center"
                  id={style.buttonSend}
                >
                  <button
                    type="submit"
                    className="btn btn-warning text-light"
                  >
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
