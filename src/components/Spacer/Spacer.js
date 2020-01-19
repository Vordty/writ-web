import React, { Fragment } from "react";

import Text from "../Text/Text";

import "./Spacer.scss";

const Spacer = ({ count, symbol, style = "mpc-3 unselectable" }) => {
	return <div className={"spacer" + " " + style}>{symbol.repeat(count)}</div>;
};

export default Spacer;
