import React, { Fragment, useContext, useState, useRef } from "react";

import Icon from "../../../Icon/Icon";
import { ComponentContext } from "../../../../contexts/ComponentContext";
import { FileContext } from "../../../../contexts/FileContext";

import "./File.scss";
import { useOutsideAlerter } from "helpers/OutsideClick";

const File = ({ file, levelIndentStep, onClick, children, ...props }) => {
	const fileRef = useRef(null);
	const { id, title, level, isOpen, isFolder, isRenaming } = file;

	const { onMenuClick } = useContext(ComponentContext);
	const { openFile, turnOffRenameState } = useContext(FileContext);

	useOutsideAlerter(fileRef, () => onFileOutsideClick(), ["resizable-drag-line"]);

	const onFileOutsideClick = () => {
		if (isRenaming) {
			turnOffRenameState(id);
		}
	};

	let folderClassName = "folder";
	let fileClassName = "file";

	if (isRenaming) {
		folderClassName += " folder-rename";
		fileClassName += " file-rename";
	}

	return isFolder ? (
		<Fragment>
			<div className={folderClassName} ref={fileRef}>
				<div
					{...props}
					className="folder-title"
					onClick={() => onClick(id)}
					onContextMenu={e => onMenuClick(e, "folder", id)}
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
			ref={fileRef}
			className={fileClassName}
			style={{ paddingLeft: `${level * levelIndentStep}px` }}
			onContextMenu={e => onMenuClick(e, "file", id)}
			onDoubleClick={() => openFile(id)}
		>
			{title}
		</div>
	);
};

export default File;
