import React, { Fragment, useContext, useState, useRef } from "react";

import Icon from "../../../Icon/Icon";
import { ComponentContext } from "../../../../contexts/ComponentContext";
import { FileContext } from "../../../../contexts/FileContext";

import "./File.scss";
import { useOutsideAlerter } from "helpers/OutsideClick";

const File = ({ file, levelIndentStep, onClick, children, ...props }) => {
	const fileRef = useRef(null);
	const { id, title, level, isOpen, isFolder } = file;

	const [renameText, setRenameText] = useState(title);

	const { onMenuClick } = useContext(ComponentContext);
	const { openFile, turnOffRenameState, changeFileTitle, renameStateInfo } = useContext(FileContext);

	useOutsideAlerter(fileRef, () => onRenameOutsideClick(), ["resizable-drag-line"]);

	const isRenaming = renameStateInfo.isActive && renameStateInfo.fileId === id;

	const onRenameOutsideClick = () => {
		if (isRenaming) {
			turnOffRenameState(id);
			changeFileTitle(id, renameText);
		}
	};

	const onRenameChange = e => {
		setRenameText(e.target.value);
	};

	return isFolder ? (
		<Fragment>
			<div className="folder" ref={fileRef}>
				{isRenaming ? (
					<div
						style={{
							marginLeft: `${level * levelIndentStep}px`
						}}
						className="one-liner"
					>
						<Icon type="arrow" customStyle={isOpen ? "arrow-open" : "arrow"} />
						<input value={renameText} className="folder-rename" onChange={onRenameChange} />
					</div>
				) : (
					<div
						{...props}
						className="folder-title overflow-dots"
						onClick={() => onClick(id)}
						onContextMenu={e => onMenuClick(e, "folder", id)}
						style={{ paddingLeft: `${level * levelIndentStep}px` }}
					>
						<Icon type="arrow" customStyle={isOpen ? "arrow-open" : "arrow"} />
						{title}
					</div>
				)}
				{isOpen && <div className="folder-content">{children}</div>}
			</div>
		</Fragment>
	) : isRenaming ? (
		<input
			ref={fileRef}
			value={renameText}
			onChange={onRenameChange}
			className="folder-rename"
			style={{ marginLeft: `${level * levelIndentStep}px` }}
		/>
	) : (
		<div
			{...props}
			ref={fileRef}
			className="file overflow-dots"
			style={{ paddingLeft: `${level * levelIndentStep}px` }}
			onContextMenu={e => onMenuClick(e, "file", id)}
			onDoubleClick={() => openFile(id)}
		>
			{title}
		</div>
	);
};

export default File;
