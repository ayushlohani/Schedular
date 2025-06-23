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
        <div onClick={() => onNav("Mental")} className="cat-cont">
          Mental
        </div>
        <div onClick={() => onNav("Physical")} className="cat-cont">
          Physical
        </div>
        <div onClick={() => onNav("Financial")} className="cat-cont">
          Financial
        </div>
      </div>
    </div>
  );
};

export default Category;
