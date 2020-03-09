import React, { Fragment, useContext, useRef } from "react";

import Icon from "../../../Icon/Icon";
import { ComponentContext } from "../../../../contexts/ComponentContext";
import { FileContext } from "../../../../contexts/FileContext";

import "./File.scss";

const File = ({ id, title, level, levelIndentStep, onClick, isOpen, isFolder, children, ...props }) => {
	const { onMenuClick } = useContext(ComponentContext);
	const { openFile } = useContext(FileContext);

	return isFolder ? (
		<Fragment>
			<div className="folder">
				<div
					{...props}
					className="folder-title"
					onClick={() => onClick(id)}
					onContextMenu={e => onMenuClick(e, "folder", "right")}
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
			{...props}
			className="file"
			style={{ paddingLeft: `${level * levelIndentStep}px` }}
			onContextMenu={e => onMenuClick(e, "file")}
			onDoubleClick={() => openFile(id)}
		>
			{title}
		</div>
	);
};

export default File;
