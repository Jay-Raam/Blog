import React from "react";
import "./blog.css";

const LoadingSpinner = () => {
  return (
    <div className="cube-loader">
      <div className="cube-top"></div>
      <div className="cube-wrapper">
        <span className="cube-span"></span>
        <span className="cube-span"></span>
        <span className="cube-span"></span>
        <span className="cube-span"></span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
