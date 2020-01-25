import React from "react";

import "./Shape.scss";

const Shape = ({ type, children }) => {
	return <div className={type}>{children}</div>;
};

export default Shape;
