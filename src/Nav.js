// import React, { useState } from "react";

function Nav({ setIsVisible, isVisible }) {
  return (
    <div className="header">
      <button
        id="menu-button"
        onClick={() => {
          setIsVisible(!isVisible);
        }}
      >
        {" "}
        &#9776;
      </button>
      <div className="title">
        <h1>Lotion</h1>
        <p> Like Notion, but worse.</p>
      </div>
    </div>
  );
}

export default Nav;
