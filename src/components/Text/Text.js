import React from "react";

import "./Text.scss";

const Text = ({ type, customStyle, children }) => {
	return <p className={type + " " + customStyle}>{children}</p>;
};

export default Text;
