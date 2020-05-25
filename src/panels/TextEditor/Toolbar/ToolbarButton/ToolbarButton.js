import React from "react";

import Button from "components/Button/Button";

import "./ToolbarButton.scss";

const ToolbarButton = ({ format, icon, isActive, onClick }) => {
	return (
		<Button
			type="toolbar"
			active={isActive.toString()}
			onMouseDown={e => {
				e.preventDefault();
				onClick(e, format);
			}}
		>
			<div>{icon}</div>
		</Button>
	);
};

export default ToolbarButton;
