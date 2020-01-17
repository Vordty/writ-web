import React from "react";
import "./Background.scss";

export const Background = ({ pattern, children }) => {
	const renderBackground = () => {
		switch (pattern) {
			case "dots":
				return returnPatternBG("background-dots");
			default:
				return returnPatternBG("background");
		}
	};

	const returnPatternBG = className => {
		return <div className={className}>{children}</div>;
	};

	return renderBackground();
};

export default Background;
