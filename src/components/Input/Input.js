import React from "react";

import "./Input.scss";

export const Input = ({ style }) => {
	return (
		<div className={"input-container" + " " + style}>
			<input className="input" type="text" />
		</div>
	);
};

export default Input;
