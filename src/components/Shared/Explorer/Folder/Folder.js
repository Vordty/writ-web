import React, { useState } from "react";

import "./Folder.scss";

const Folder = ({ id, title, level, levelIndentStep, onClick, isOpen, children }) => {
	return (
		<div className="folder">
			<div
				className="folder-title"
				onClick={() => onClick(id)}
				style={{ paddingLeft: `${level * levelIndentStep}px` }}
			>
				{title}
			</div>
			{isOpen && <div className="folder-content">{children}</div>}
		</div>
	);
};

export default Folder;
