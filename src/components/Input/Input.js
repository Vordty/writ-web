import React from "react";

import "./Input.scss";

export const Input = ({ style = "", containerStyle = "", placeholder = "Missing placeholder", hidden }) => {
	const inputType = hidden ? "password" : "text";

	return (
		<div className={"input-container" + " " + containerStyle}>
			<input className={"input" + " " + style} type={inputType} placeholder={placeholder} />
		</div>
	);
};

export default Input;
