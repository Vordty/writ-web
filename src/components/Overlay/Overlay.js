import React from "react";

import "./Overlay.scss";

const Overlay = ({ customStyle, children, ...props }) => {
	return (
		<div {...props} className={"overlay" + " " + customStyle}>
			{children}
		</div>
	);
};

export default Overlay;
