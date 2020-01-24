import React from "react";

import "./Input.scss";

const Input = ({ style = "", containerStyle = "", placeholder = "Missing placeholder", hidden, ...props }) => {
	const inputType = hidden ? "password" : "text";

	return (
		<div className={"input-container" + " " + containerStyle}>
			<input {...props} className={"input" + " " + style} type={inputType} placeholder={placeholder} />
		</div>
	);
};

export default Input;
