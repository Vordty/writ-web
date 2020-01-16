import React from "react";

import "./Text.scss";

export const Text = ({ type, children }) => {
	return <p className={type}>{children}</p>;
};

export default Text;
