import React, { Fragment } from "react";

import "./File.scss";

const File = ({ id, title, level, levelIndentStep, onClick, isOpen, isFolder, children }) => {
	const _onClick = e => {
		if (e.button === 2) {
			document.addEventListener("contextmenu", onContextMenu);
			console.log("RIGHT CLICK");
		}
	};

	const onContextMenu = e => {
		e.preventDefault();
		document.removeEventListener("contextmenu", onContextMenu);
	};

	return isFolder ? (
		<Fragment>
			<div className="folder">
				<div
					className="folder-title"
					onClick={() => onClick(id)}
					onMouseUp={_onClick}
					style={{ paddingLeft: `${level * levelIndentStep}px` }}
				>
					{title}
				</div>
				{isOpen && <div className="folder-content">{children}</div>}
			</div>
		</Fragment>
	) : (
		<div className="file" style={{ paddingLeft: `${level * levelIndentStep}px` }} onMouseUp={_onClick}>
			{title}
		</div>
	);
};

export default File;
