import React from "react";

import Resizable from "../../Resizable/Resizable";

import "./Sidebar.scss";

const Sidebar = ({ header, children }) => {
	return (
		<div className="sidebar">
			<div className="sidebar-options">
				<div className="sidebar-option">1</div>
				<div className="sidebar-option">2</div>
				<div className="sidebar-option">3</div>
			</div>
			<Resizable customStyle="sidebar-content" minWidth={200} maxWidth={400}>
				<div className="sidebar-header">{header}</div>
				{children}
			</Resizable>
		</div>
	);
};

export default Sidebar;
