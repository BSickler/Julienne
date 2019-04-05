import React from "react";

const Card = ({ contents, handleClick }) => {
  let label = Object.keys(contents)[0];

  return (
    <div
      className="card"
      id={label}
      onClick={e => handleClick(label, contents[label])}
    >
      {label}
    </div>
  );
};

export default Card;
