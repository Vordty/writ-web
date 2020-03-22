import React, { useState } from "react";

import Resizable from "../../Resizable/Resizable";

import "./Sidebar.scss";

const SIDEBAR_WIDTH = 250;

const Sidebar = ({ header, children }) => {
	const [sidebarContentWidth, setSidebarContentWidth] = useState(SIDEBAR_WIDTH);

	const onWidthChange = newWidth => {
		setSidebarContentWidth(newWidth);
	};

	return (
		<div className="sidebar">
			<div className="sidebar-options">
				<div className="sidebar-option">1</div>
				<div className="sidebar-option">2</div>
				<div className="sidebar-option">3</div>
			</div>
			<Resizable customStyle="sidebar-content" minWidth={200} maxWidth={400} onWidthChange={onWidthChange}>
				<div className="sidebar-header">{header}</div>
				{React.cloneElement(children, { contentWidth: sidebarContentWidth })}
			</Resizable>
		</div>
	);
};

export default Sidebar;
