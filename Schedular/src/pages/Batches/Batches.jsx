import React from "react";
import { useParams } from "react-router-dom";
import Schedule from "../Schedule/Schedule";
import AdvisorList from "../AdvisorList/AdvisorList";

const Batches = () => {
  const { isGroup } = useParams();
  return (
    <>
      {isGroup != "group" ? (
        <AdvisorList />
      ) : (
        <div className="batches">Batches</div>
      )}
    </>
  );
};

export default Batches;
