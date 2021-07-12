import { createStore } from "redux";

const initialState = {
  imagesArray: [],
};

const counterReducer = (state = initialState, action) => {
  if (action.type === "fetchImage") {
    return {
      imagesArray: ["image1", "image2", "image3"],
    };
  }
  return state;
};

const store = createStore(counterReducer);

export default store;
