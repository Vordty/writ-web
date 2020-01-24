import React from "react";

import Text from "../Text/Text";

import "./Button.scss";

const Button = ({ type, textType = "regular", style = "", children, ...props }) => {
	return (
		<div className="button-container">
			<button {...props} className={type + " " + style}>
				<Text type={textType}>{children}</Text>
			</button>
		</div>
	);
};

export default Button;
