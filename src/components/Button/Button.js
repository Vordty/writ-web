import React from "react";

import Text from "../Text/Text";

import "./Button.scss";

const Button = ({ type, textType = "regular", style = "", children }) => {
	return (
		<div className="button-container">
			<button className={type + " " + style}>
				<Text type={textType}>{children}</Text>
			</button>
		</div>
	);
};

export default Button;
