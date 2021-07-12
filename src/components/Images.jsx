import React from "react";
import "./images.css";
function Images(props) {
  return <img className="Images" src={props.imageUrl}></img>;
}

export default Images;
