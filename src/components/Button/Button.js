import React from "react";

import Text from "../Text/Text";

import "./Button.scss";

const Button = ({ type, style = "", children, ...props }) => {
	return (
		<button {...props} className={"btn-" + type + " " + style}>
			{children}
		</button>
	);
};

export default Button;
