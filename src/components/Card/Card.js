import React from "react";

import "./Card.scss";

const Card = ({ style = "", children }) => {
	return <div className={"card" + " " + style}>{children}</div>;
};

export default Card;
