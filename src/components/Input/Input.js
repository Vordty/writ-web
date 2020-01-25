import React from "react";

import "./Input.scss";

const Input = ({ style = "", containerStyle = "", placeholder = "", hidden, maxLength = "48", inputRef, ...props }) => {
	const inputType = hidden ? "password" : "text";

	return (
		<div className={"input-container" + " " + containerStyle}>
			<input
				{...props}
				ref={inputRef}
				className={"input" + " " + style}
				type={inputType}
				placeholder={placeholder}
				maxLength={maxLength}
			/>
		</div>
	);
};

export default Input;
