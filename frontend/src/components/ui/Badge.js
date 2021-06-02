import React from "react";

const Badge = ({ backgroundColor, children }) => {
  return (
    <span className={`badge rounded-pill ${backgroundColor}`}>{children}</span>
  );
};

export default Badge;
