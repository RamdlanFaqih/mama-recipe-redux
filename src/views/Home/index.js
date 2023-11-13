import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../Component/Navigation/Nav1";
import NavigationLogin from "../../Component/Navigation/Nav2";
import Footer from "../../Component/Footer/Footer";
import Button from "../../Component/Button/Button";
import style from "./style.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import Image1 from "../../assets/img/img1.svg";
import Image2 from "../../assets/img/img2.svg";
import ImgGrid1 from "../../assets/img/grid1-1.svg";
import ImgGrid2 from "../../assets/img/grid1-2.svg";
import ImgGrid3 from "../../assets/img/grid1-3.svg";
import ImgGrid4 from "../../assets/img/grid2-1.svg";
import ImgGrid5 from "../../assets/img/grid2-2.svg";
import ImgGrid6 from "../../assets/img/grid2-3.svg";
import { setInitialSearchQuery } from "../../redux/reducer/searchSlice"
import { useDispatch } from "react-redux";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    const fetchRecipes = async (query, sortOption) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/recipes/7`
        );
        setRecipes(response.data.data.rows[0]);
        console.log(response.data.data.rows[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes()
  }, []);

  const handleSearch = () => {
    dispatch(setInitialSearchQuery(searchQuery)); 
    const encodedSearchQuery = encodeURIComponent(searchQuery);
    navigate(`/search?query=${encodedSearchQuery}`);
  };

  return (
    <React.Fragment>
      {isLoggedIn ? <NavigationLogin /> : <Navigation />}
      <main className={style.content} id="main">
        <div className="container">
          <section id={style.landing}>
            <div className="row align-items-center">
              <section id="leftHero" className="col-12 col-lg-6">
                <div className="container">
                  <div>
                    <h1 className={style.heroTitle}>
                      Discover Recipe & Delicious Food
                    </h1>
                  </div>
                  <div className="input-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Search Restaurant Food"
                      aria-label=".form-control-lg example"
                      name="searchQuery"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <span
                      className="input-group-text px-3"
                      onClick={() => handleSearch(searchQuery)}
                    >
                      <AiOutlineSearch />
                    </span>
                  </div>
                </div>
              </section>
              <section id="rightHero" className="col-12 col-lg-6">
                <div className={style.bg}></div>
                <div className={style.container}>
                  <img
                    src={Image1}
                    style={{ width: 600 }}
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </section>
            </div>
          </section>

          <section id={style.popular} className="mt-5">
            <div className="d-flex align-items-center" id={style.subTitle}>
              <h1>Popular For You!</h1>
            </div>
            <div className="row align-items-center">
              <section id="leftPopular" className="col-12 col-lg-6">
                <div className="container-fluid" id={style.fluid}>
                  <img
                    src={recipes.image}
                    className="img-fluid"
                    style={{ width: "600px", height: "600px", objectFit: "cover", borderRadius: "10px" }}
                    alt=""
                  />
                </div>
              </section>
              <section id={style.rightPopular} className="col-12 col-lg-6">
                <div className="container-fluid">
                  <div>
                    <h1 className={style.titleContent}>
                      {recipes.food_name}
                    </h1>
                  </div>
                  <div className="description">
                    <p>
                      Create a magical recipe that will make your ramen fantastic
                    </p>
                  </div>
                  <div className="button">
                    <Button type="button" buttonName="Learn More" />
                  </div>
                </div>
              </section>
            </div>
          </section>

          <section id={style.newRecipe} className="mt-5">
            <div
              className="sub-title d-flex align-items-center"
              id={style.subTitle}
            >
              <h1>New Recipe</h1>
            </div>
            <div className="row align-items-center">
              <section id="leftPopular" className="col-12 col-lg-6">
                <div className="container-fluid" id={style.fluid}>
                  <img
                    src={Image2}
                    className="img-fluid"
                    style={{ width: "600px" }}
                    alt=""
                  />
                </div>
              </section>
              <section id={style.rightPopular} className="col-12 col-lg-6">
                <div className="container-fluid">
                  <div className="title">
                    <h1 className={style.titleContent}>
                      Banana Sandwich
                    </h1>
                  </div>
                  <div className="description">
                    <p>
                      Quick + Easy Recipes of Banana Sandwich
                    </p>
                  </div>
                  <div className="button">
                    <Button type="button" buttonName="Learn More" />
                  </div>
                </div>
              </section>
            </div>
          </section>
          <section id={style.popular} className="mt-5 py-5">
            <div
              className="sub-title d-flex align-items-center"
              id={style.subTitle}
            >
              <h1>Popular Recipe</h1>
            </div>
            <div className="row align-items-center row-gap-5">
              <section id="grid" className="col-12 col-lg-4">
                <div
                  className="container-fluid position-relative"
                  id="img-grid"
                >
                  <img src={ImgGrid1} className="img-fluid" alt="" />
                  <h1 className="position-absolute bottom-0 text-dark px-3 py-3 w-50">
                    Chicken Kare
                  </h1>
                </div>
              </section>
              <section id="grid" className="col-12 col-lg-4">
                <div className="container-fluid position-relative">
                  <img src={ImgGrid2} style={{ width: "100%" }} alt="" />
                  <h1 className="position-absolute bottom-0 text-dark px-3 py-3 w-50">
                    Bomb Chicken
                  </h1>
                </div>
              </section>
              <section id="grid" className="col-12 col-lg-4">
                <div className="container-fluid position-relative">
                  <img src={ImgGrid3} style={{ width: "100%" }} alt="" />
                  <h1 className="position-absolute bottom-0 text-dark px-3 py-3 w-50">
                    Banana Smoothie
                  </h1>
                </div>
              </section>
              <section id="grid" className="col-12 col-lg-4">
                <div className="container-fluid position-relative">
                  <img src={ImgGrid4} style={{ width: "100%" }} alt="" />
                  <h1 className="position-absolute bottom-0 text-dark px-3 py-3 w-50">
                    Coffe Lava
                  </h1>
                </div>
              </section>
              <section id="grid" className="col-12 col-lg-4">
                <div className="container-fluid position-relative">
                  <img src={ImgGrid5} style={{ width: "100%" }} alt="" />
                  <h1 className="position-absolute bottom-0 text-dark px-3 py-3 w-50">
                    Sugar Salmon
                  </h1>
                </div>
              </section>
              <section id="grid" className="col-12 col-lg-4">
                <div className="container-fluid position-relative">
                  <img src={ImgGrid6} style={{ width: "100%" }} alt="" />
                  <h1 className="position-absolute bottom-0 text-dark px-3 py-3 w-50">
                    Indian Salad
                  </h1>
                </div>
              </section>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
