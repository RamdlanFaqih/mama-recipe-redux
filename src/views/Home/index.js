import React from "react";
import { useNavigate } from "react-router-dom"
import Navigation from "../../Component/Navigation/Nav2";
import Footer from "../../Component/Footer/Footer";
import Button from "../../Component/Button/Button";
import style from "./style.module.css";
import Image1 from "../../assets/img/img1.svg";
import Image2 from "../../assets/img/img2.svg";
import ImgGrid1 from "../../assets/img/grid1-1.svg"
import ImgGrid2 from "../../assets/img/grid1-2.svg"
import ImgGrid3 from "../../assets/img/grid1-3.svg"
import ImgGrid4 from "../../assets/img/grid2-1.svg"
import ImgGrid5 from "../../assets/img/grid2-2.svg"
import ImgGrid6 from "../../assets/img/grid2-3.svg"


const Home = () => {
  const navigate = useNavigate();
  function logOut() {
    localStorage.clear();
    return navigate("/login");
  }
  return (
    <React.Fragment>
      <Navigation />
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
                  <div className="search-bar">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Search Restaurant Food"
                      aria-label=".form-control-lg example"
                    />
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

          <section id={style.popular}>
            <div className="d-flex align-items-center" id={style.subTitle}>
              <h1>Popular For You!</h1>
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
                  <div>
                    <h1 className={style.titleContent}>
                      Healthy Bone Broth Ramen (Quick & Easy)
                    </h1>
                  </div>
                  <div className="description">
                    <p>
                      Quick + Easy Chicken Bone Broth Ramen- Healthy chicken
                      ramen in a hurry? That’s right!
                    </p>
                  </div>
                  <div className="button">
                    <Button type="button" buttonName="Learn More" />
                  </div>
                </div>
              </section>
            </div>
          </section>

          <section id={style.newRecipe}>
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
                      Healthy Bone Broth Ramen (Quick & Easy)
                    </h1>
                  </div>
                  <div className="description">
                    <p>
                      Quick + Easy Chicken Bone Broth Ramen- Healthy chicken
                      ramen in a hurry? That’s right!
                    </p>
                  </div>
                  <div className="button">
                    <Button type="button" buttonName="Learn More" />
                  </div>
                </div>
              </section>
            </div>
          </section>
          <section id={style.popular}>
                <div className="sub-title d-flex align-items-center" id={style.subTitle}>
                  <h1>Popular Recipe</h1>
                </div>
                <div className="row align-items-center row-gap-5">
                  <section id="grid" className="col-12 col-lg-4">
                    <div className="container-fluid" id="img-grid">
                      <img src={ImgGrid1} style={{width : '100%'}} alt="" />
                    </div>
                  </section>
                  <section id="grid" className="col-12 col-lg-4">
                    <div className="container-fluid">
                      <img src={ImgGrid2} style={{width : '100%'}} alt="" />
                    </div>
                  </section>
                  <section id="grid" className="col-12 col-lg-4">
                    <div className="container-fluid">
                      <img src={ImgGrid3} style={{width : '100%'}} alt="" />
                    </div>
                  </section>
                  <section id="grid" className="col-12 col-lg-4">
                    <div className="container-fluid">
                      <img src={ImgGrid4} style={{width : '100%'}} alt="" />
                    </div>
                  </section>
                  <section id="grid" className="col-12 col-lg-4">
                    <div className="container-fluid">
                      <img src={ImgGrid5} style={{width : '100%'}} alt="" />
                    </div>
                  </section>
                  <section id="grid" className="col-12 col-lg-4">
                    <div className="container-fluid">
                      <img src={ImgGrid6} style={{width : '100%'}} alt="" />
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
