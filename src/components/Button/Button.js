import React from "react";

import Text from "../Text/Text";

import "./Button.scss";

const Button = ({ type, style = "", children, ...props }) => {
	return (
		<div className="button-container">
			<button {...props} className={type + " " + style}>
				{children}
			</button>
		</div>
	);
};

export default Button;
