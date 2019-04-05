import React from "react";

import "./index.css";

const BreadcrumbBar = props => {
  const statesList = props.breadcrumbs.statesList;

  return (
    <div className="breadcrumbBar">
      {Object.keys(statesList).map(index => (
        <Crumb
          key={index}
          handleClick={props.handleClick}
          state={statesList[index]}
        />
      ))}
    </div>
  );
};

const Crumb = ({ state, handleClick }) => (
  <div className="crumb" onClick={e => console.log(state)}>
    {state.inventoryLbl}
  </div>
);

export default BreadcrumbBar;
