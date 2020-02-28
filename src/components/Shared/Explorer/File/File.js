import React, { Fragment, useContext, useRef } from "react";

import Icon from "../../../Icon/Icon";
import { ComponentContext } from "../../../../contexts/ComponentContext";

import "./File.scss";

const File = ({ id, title, level, levelIndentStep, onClick, isOpen, isFolder, children }) => {
	const { onRightClick } = useContext(ComponentContext);

	return isFolder ? (
		<Fragment>
			<div className="folder">
				<div
					className="folder-title"
					onClick={() => onClick(id)}
					onMouseUp={e => onRightClick(e, "folder")}
					style={{ paddingLeft: `${level * levelIndentStep}px` }}
				>
					<Icon type="arrow" style={isOpen ? "arrow-open" : "arrow"} />
					{title}
				</div>
				{isOpen && <div className="folder-content">{children}</div>}
			</div>
		</Fragment>
	) : (
		<div
			className="file"
			style={{ paddingLeft: `${level * levelIndentStep}px` }}
			onMouseUp={e => onRightClick(e, "file")}
		>
			{title}
		</div>
	);
};

export default File;
