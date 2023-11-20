import React from "react";
import axios from "axios";
import Navigation from "../../Component/Navigation/Nav1";
import Footer from "../../Component/Footer/Footer";
import style from "./profile.module.css";
import ModalUpdate from "../../Component/modalUpdate/index";
import { FaTrash } from "react-icons/fa";
import DeleteConfirmationModal from "../../Component/ModalDelete";
import { error } from "jquery";

const Profile = () => {
  const [user, setUser] = React.useState("");
  const [recipesId, setRecipesId] = React.useState(null);
  const [recipes, setRecipes] = React.useState([]);
  const [savedRecipes, setSavedRecipes] = React.useState([]);
  const [likedRecipe, setLikedRecipe] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const userID = localStorage.getItem("userID");
  console.log(userID);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/users/recipes/${userID}`
        );
        setUser(response.data.rows[0]);

        const recipesResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/recipes/users/${userID}`
        );
        setRecipes(recipesResponse.data.data.rows);

        const savedResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/saved/users/${userID}`
        );
        console.log(savedResponse.data.message.rows);
        setSavedRecipes(savedResponse.data.message.rows);

        const likedResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/liked/users/${userID}`
        );
        console.log(likedResponse.data.message.rows);
        setLikedRecipe(likedResponse.data.message.rows);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [userID]);
  React.useEffect(() => {
    localStorage.setItem("userRecipes", JSON.stringify(recipes));
  }, [recipes]);

  const handleDeleteClick = (recipes_id) => {
    setRecipesId(recipes_id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/recipes/hapusproduct/${recipesId}`
      );

      const updatedRecipes = recipes.filter(
        (recipe) => recipe.recipes_id !== recipesId
      );
      setRecipes(updatedRecipes);

      setShowModal(false);
    } catch (error) {
      console.error("Failed to delete recipe:", error);
    }
  };
  const handleUnsave = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/saved/unsaved/${userID}`
      );

      const updateSaved = savedRecipes.filter(
        (savedRecipes) => savedRecipes.recipes_id !== userID
      );
      setSavedRecipes(updateSaved);

      setShowModal(false);
    } catch (eror) {
      console.log("Failed unsave", error);
    }
  };

  return (
    <div>
      <Navigation />
      <div className="container" id="allContent">
        {console.log(user)}
        <div className="row align-items-center">
          <div className={`col-12 text-center`}>
            <img src={user.user_image} className={`${style.image}`} alt="" />
            <ModalUpdate />
            <h1>{user.user_name}</h1>
          </div>
          <div className="col-12">
            <div
              className="accordion accordion-flush"
              id="accordionFlushExample"
            >
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
                  <div className="accordion-body row">
                    <div className="row row-cols-1 row-cols-lg-3 g-4">
                      {recipes.map((recipe) => (
                        <div className="col" key={recipe.recipes_id}>
                          <div className={style.recipesContainer}>
                            <span
                              className={style.deleteIcon}
                              onClick={() =>
                                handleDeleteClick(recipe.recipes_id)
                              }
                            >
                              <FaTrash />
                            </span>
                            <img
                              src={recipe.image}
                              alt="myrecipe"
                              className={style.recipes}
                            />
                            <h1 className={style.foodName}>
                              {recipe.food_name}
                            </h1>
                          </div>
                        </div>
                      ))}
                    </div>
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
                  <div className="accordion-body row">
                    <div className="row row-cols-1 row-cols-lg-3 g-4">
                      {savedRecipes.map((saved) => (
                        <div className="col" key={saved.recipes_id}>
                          <div className={style.recipesContainer}>
                            <span className={style.deleteIcon}>
                              <FaTrash
                                onClick={() => handleUnsave(saved.recipes_id)}
                              />
                            </span>
                            <img
                              src={saved.image}
                              alt="savedRecipe"
                              className={style.recipes}
                            />
                            <h1 className={style.foodName}>
                              {saved.food_name}
                            </h1>
                          </div>
                        </div>
                      ))}
                    </div>
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
                  <div className="accordion-body row">
                    <div className="row row-cols-1 row-cols-lg-3 g-4">
                      {likedRecipe.map((liked) => (
                        <div className="col" key={liked.recipes_id}>
                          <div className={style.recipesContainer}>
                            <span className={style.deleteIcon}>
                              <FaTrash />
                            </span>
                            <img
                              src={liked.image}
                              alt="likedRecipe"
                              className={style.recipes}
                            />
                            <h1 className={style.foodName}>
                              {liked.food_name}
                            </h1>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DeleteConfirmationModal
            show={showModal}
            onHide={() => setShowModal(false)}
            onConfirm={handleDelete}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
