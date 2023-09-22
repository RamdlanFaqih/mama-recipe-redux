import React from "react";
import "./bgLeft.css";
import Background from "../../assets/img/background.png";
import Icon from "../../assets/icon/iconMama.svg"

const BgLeft = () => {
  return (
      <>
        <div className="bg"></div>
        <img src= {Background} alt="" />
        <div className="icon-wrapper">
          <img src={Icon} alt="" />
        </div>
    
      </>
  );
};

export default BgLeft;
