import React from "react";
import "./Category.scss";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();

  const onNav = (path) => {
    navigate(path);
  };

  return (
    <div className="Category">
      <h1>What are you looking for?</h1>
      <div className="cat">
        <button onClick={() => onNav("/Mental")}>Mental</button>
        <button onClick={() => onNav("/Physical")}>Physical</button>
        <button onClick={() => onNav("/Financial")}>Financial</button>
      </div>
    </div>
  );
};

export default Category;
