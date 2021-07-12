import React, { useState, useEffect } from "react";
import { createApi } from "unsplash-js";
// import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartBroken, faSearch } from "@fortawesome/free-solid-svg-icons";
import Images from "./components/Images";
import "./searchPage.css";

const api = createApi({
  accessKey: "gpuBYri2IagsURMg8ZObc8GY3X8rfnUHnzQ7pW3RCWA",
});

function SearchPage() {
  const [input, setInput] = useState("");
  const [images, setImages] = useState([]);
  const [heading, setheading] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isempty, setIsEmpty] = useState(false);
  const [iserror, setiserror] = useState(false);

  const setInputHandler = (e) => {
    setIsEmpty(false);
    setInput(e.target.value);
  };

  function fetchImageHandler(e) {
    e.preventDefault();
    setIsEmpty(false);
    setIsLoading(true);
    setiserror(false);

    if (input === "") {
      setIsEmpty(true);
      setIsLoading(false);
      return;
    }
    api.search
      .getPhotos({ query: input, orientation: "landscape" })
      .then((result) => {
        setImages(result.response.results);
        setheading(input);
        setIsLoading(false);
      })
      .catch(() => {
        setiserror(true);
        setInput("");
        setIsLoading(false);
      });
  }
  useEffect(() => {
    setIsLoading(true);
    api.search
      .getPhotos({ query: "random", orientation: "landscape" })
      .then((result) => {
        setImages(result.response.results);
        setheading("RANDOM");
        setiserror(false);
        setIsLoading(false);
      })
      .catch(() => {
        setiserror(true);
        setInput("");
        setIsLoading(false);
      });
  }, []);

  var content = <div></div>;

  if (iserror) {
    content = (
      <div>
        <h2>Something went wrong.Check connection</h2>
        <FontAwesomeIcon icon={faHeartBroken} />
      </div>
    );
  } else if (isLoading) {
    content = <div>Loading...</div>;
  } else {
    content = (
      <div>
        <div className="text">
          <h1>{heading.toUpperCase()}</h1>
          <p>{images.length} images has been found</p>
        </div>
        <div className="Images-body">
          {images.map((image) => {
            return (
              <div className="Image-div">
                <Images imageUrl={image.urls.small} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="body">
      <div className="Form-div">
        <form onSubmit={fetchImageHandler} className="Form_Body">
          <input
            type="text"
            placeholder="Search for photos"
            value={input}
            onChange={setInputHandler}
            contentEditable="true"
            className={isempty ? "inputclass" : ""}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>{" "}
        </form>
      </div>
      {content}
    </div>
  );
}

export default SearchPage;
