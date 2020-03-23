import React from "react";

import { ReactComponent as Dot3SVG } from "../../assets/svgs/3dot.svg";
import { ReactComponent as CheckmarkSVG } from "../../assets/svgs/checkmark.svg";
import { ReactComponent as PlusSVG } from "../../assets/svgs/plus.svg";
import { ReactComponent as XSVG } from "../../assets/svgs/x.svg";
import { ReactComponent as Arrow } from "../../assets/svgs/arrow.svg";

import "./Icon.scss";

const Icon = ({ type, customStyle = "", onClick, style }) => {
	const _type = onClick ? type : type + " cursor-pointer";
	const props = {
		className: _type + ` ${customStyle}`,
		onClick: onClick ? onClick : () => console.log(type + " Clicked")
	};

	switch (type) {
		case "plus":
			return <PlusSVG {...props} />;
		case "x":
			return <XSVG {...props} />;
		case "checkmark":
			return <CheckmarkSVG {...props} />;
		case "dot3":
			return <Dot3SVG {...props} />;
		case "arrow":
			return <Arrow {...props} />;
	}
};

export default Icon;
