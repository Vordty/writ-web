import React, { Fragment } from "react";

import Text from "../Text/Text";

import "./Spacer.scss";

const Spacer = ({ count, symbol, symbolSize, style = "m" }) => {
	const renderSpacer = () => {
		return <Text type={symbolSize}>{symbol.repeat(count)}</Text>;
	};
	return <div className={"spacer" + " " + style}>{renderSpacer()}</div>;
};

export default Spacer;
