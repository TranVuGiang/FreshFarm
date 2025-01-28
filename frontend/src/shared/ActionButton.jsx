import React from "react";

const ActionButton = ({ title, style}) => {
  return (
    <button className={`${style} px-8 py-3 rounded-md text-lg font-normal hover:bg-opacity-80 transition-colors`}>
      {title}
    </button>
  );
};

export default ActionButton;
