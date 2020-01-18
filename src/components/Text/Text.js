import React from "react";

import "./Text.scss";

const Text = ({ type, children }) => {
	return <p className={type}>{children}</p>;
};

export default Text;
