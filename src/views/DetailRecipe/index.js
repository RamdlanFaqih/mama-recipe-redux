import React, { useEffect, useState } from "react";
import Navigation from "../../Component/Navigation/Nav1";
import Footer from "../../Component/Footer/Footer";
import style from "./detail.module.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa6";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const DetailRecipe = () => {
  const { recipes_id } = useParams();
  const users_id = localStorage.getItem("userID");
  const [recipes, setRecipes] = useState("");
  const [isLiked, setIsLiked] = useState(
    localStorage.getItem(`isLiked_${recipes_id}`) === "true"
  );
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
    setIsLiked(localStorage.getItem(`isLiked_${recipes_id}_${users_id}`) === "true");
  }, [recipes_id, users_id]);
  

  const handleVideo = () => {
    console.log("handleVideo is called");
    navigate(`/DetailVideo/${recipes_id}`);
  };

  const handleLike = async () => {
    console.log(users_id);
    console.log(recipes_id);
    try {
      if (isLiked) {
        const response = await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/liked/unlike/${users_id}`,
          {
            data: {
              recipes_id: recipes_id,
            },
          }
        );
        console.log("Unliked Recipe", response);
      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/liked/insert/${users_id}`,
          {
            recipes_id: recipes_id,
          }
        );
        console.log("Liked Recipe", response);
      }

      // Update state after successful API call
      setIsLiked(!isLiked);

      // Update local storage
      localStorage.setItem(`isLiked_${recipes_id}`, (!isLiked).toString());
    } catch (error) {
      console.log("Error Like/Unlike", error);
    }
  };
  const handleSave = async () => {
    console.log(users_id);
    console.log(recipes_id);
    try{
      if (isSaved) {
        const response = await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/saved/unsaved/${users_id}`,
          {
            recipes_id: recipes_id
          }
        );
        console.log("Unsave Recipe", response);
      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/saved/insert/${users_id}`,
          {
            recipes_id: recipes_id,
          }
        );
        console.log("Saved Recipe", response);
      }
      setIsSaved(!isSaved);

      localStorage.setItem(`isSaved_${recipes_id}`, (!isSaved).toString());
    } catch(error) {
      console.log("Error Saved/Unsaved", error);
    };
  };

  return (
    <div>
      <Navigation />
      <div className="container">
        <section id={style.allContent}>
          <div className="row align-items-center">
            <div className="col-12 text-center" id={style.titleContent}>
              <h1>{recipes.food_name}</h1>
              <div
                className=""
                style={{ position: "relative", width: "100%", height: "auto" }}
              >
                <img
                  src={recipes.image}
                  className={`${style.imageRecipes} `}
                  alt="resep"
                  style={{ width: "100%", height: "600px" }}
                />
                <div className="">
                  <div
                    className={style.likeIcon}
                    style={{
                      position: "absolute",
                      bottom: "40px",
                      right: "40px",
                      backgroundColor: isLiked ? "#EFC81A" : "transparent",
                      padding: "5px",
                      cursor: "pointer",
                    }}
                    onClick={handleLike}
                  >
                    {isLiked ? (
                      <AiFillLike color="#FFF" size={52} />
                    ) : (
                      <AiOutlineLike color="#FFF" size={52} />
                    )}
                  </div>
                  <div
                    className={style.saveIcon}
                    style={{
                      position: "absolute",
                      bottom: "40px",
                      right: "120px",
                      backgroundColor: isSaved ? "#3498db" : "transparent",
                      padding: "5px",
                      cursor: "pointer",
                    }}
                    onClick={handleSave}
                  >
                    {isSaved ? (
                      <FaBookmark color="#FFF" size={52} />
                    ) : (
                      <FaRegBookmark color="#FFF" size={52} />
                    )}
                  </div>
                </div>
              </div>
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
                  <button
                    type="button"
                    className="btn btn-warning btn-lg"
                    onClick={() => handleVideo()}
                  >
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
                  <button type="submit" className="btn btn-warning text-light">
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
