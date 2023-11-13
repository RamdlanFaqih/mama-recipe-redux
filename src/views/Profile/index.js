import React from "react";
import axios from "axios";
import Navigation from "../../Component/Navigation/Nav1";
import Footer from "../../Component/Footer/Footer";
import style from "./profile.module.css";
import ModalUpdate from "../../Component/modalUpdate/index";
import { FaTrash } from "react-icons/fa";
import DeleteConfirmationModal from "../../Component/ModalDelete";

const Profile = () => {
  const [user, setUser] = React.useState("");
  const [recipesId, setRecipesId] = React.useState(null);
  const [recipes, setRecipes] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const userID = localStorage.getItem("userID");
  console.log(userID);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/users/recipes/${userID}`
        );
        console.log(response.data.rows);
        setUser(response.data.rows[0]);

        const recipesResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/recipes/users/${userID}`
        );
        console.log(recipesResponse.data.data.rows);
        setRecipes(recipesResponse.data.data.rows);
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

                    <DeleteConfirmationModal
                      show={showModal}
                      onHide={() => setShowModal(false)}
                      onConfirm={handleDelete}
                    />
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
