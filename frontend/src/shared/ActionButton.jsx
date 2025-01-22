import React from "react";

const ActionButton = ({ title, backgroundColor, textColor }) => {
  return (
    <button className={`${backgroundColor} ${textColor} px-8 py-3 rounded-md text-lg font-normal hover:bg-opacity-80 transition-colors`}>
      {title}
    </button>
  );
};

export default ActionButton;
