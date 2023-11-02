import React from "react";
import axios from "axios";
import Navigation from "../../Component/Navigation/Nav1";
import Footer from "../../Component/Footer/Footer";
import Button from "../../Component/Button/Button";
import "./app.css";

const AddRecipe = () => {
  const [data, setData] = React.useState({
    image: "",
    food_name: "",
    ingredients: "",
    video_title: "",
    video: "",
    users_id: localStorage.getItem('userID'),
  });
  const [isError, setIsError] = React.useState(false);
  const [saveImage, setSaveImage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };
  const handleUpload = (e) => {
    const uploader = e.target.files[0];
    setSaveImage(uploader);
    console.log(uploader);
  };

  function handleSubmit(e) {
    e.preventDefault();


    const productData = new FormData();
    productData.append("food_name", data.food_name);
    productData.append("image", saveImage);
    productData.append("ingredients", data.ingredients);
    productData.append("video_title", data.video_title);
    productData.append("video", data.video);
    productData.append("users_id", data.users_id)

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/recipes/tambahproduct`, productData)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.errorMessage);
        setIsError(true);
        setErrorMessage("Data Error");
      });
  }

  return (
    <React.Fragment>
      <Navigation />
      <div className="container" id="all-content">
        <form onSubmit={handleSubmit}>
          <div className="row align-items-center">
            <div className="col-12 text-center mx-auto" id="insert">
              <div className="d-grid mb-3" id="insert-data">
                <input
                  onChange={handleUpload}
                  type="file"
                  id="file"
                  className="text-center"
                />
                <label htmlFor="file">
                  <p>Image</p>
                  <img src="../../Component/assets/icon/addImage.svg" alt="" />
                  <p>Add Photo </p>
                </label>
              </div>
              <div className="mb-3">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Food Name"
                  name="food_name"
                  value={data.food_name}
                  onChange={handleChange}
                  aria-label=".form-control-lg example"
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Ingredients"
                  id="floatingTextarea2"
                  name="ingredients"
                  value={data.ingredients}
                  onChange={handleChange}
                  style={{ height: "380px" }}
                ></textarea>
              </div>
              <div className="mb-3">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Video_Title"
                  name="video_title"
                  value={data.video_title}
                  onChange={handleChange}
                  aria-label=".form-control-lg example"
                />
              </div>
              <div className="d-grid mb-3" id="insert-data">
                <textarea
                  className="form-control"
                  placeholder="Video"
                  id="floatingTextarea2"
                  name="video"
                  value={data.video}
                  onChange={handleChange}
                  style={{ height: "380px" }}
                ></textarea>
              </div>
            </div>
            <div className="col-12 text-center mx-auto" id="post">
              <div className="d-grid mb-3">
                <Button type="submit" buttonName="Submit" />
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default AddRecipe;
