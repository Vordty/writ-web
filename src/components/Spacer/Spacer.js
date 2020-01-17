import React, { Fragment } from "react";

import Text from "../Text/Text";

import "./Spacer.scss";

export const Spacer = ({ count, symbol, symbolSize, margin = "14px" }) => {
	const renderSpacer = () => {
		return <Text type={symbolSize}>{symbol.repeat(count)}</Text>;
	};
	return (
		<div className="spacer" style={{ margin: margin }}>
			{renderSpacer()}
		</div>
	);
};

export default Spacer;
