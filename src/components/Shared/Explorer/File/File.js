import React, { Fragment, useContext, useState, useRef, useEffect } from "react";

import Icon from "../../../Icon/Icon";
import { ComponentContext } from "../../../../contexts/ComponentContext";
import { FileContext } from "../../../../contexts/FileContext";

import "./File.scss";
import { useOutsideAlerter } from "helpers/OutsideClick";
import { getFileLevel } from "helpers/FileContextHelpers";

const File = ({ file, levelIndentStep, onClick, children, ...props }) => {
	const fileRef = useRef(null);
	const { id, title, isOpen, isFolder } = file;

	const [renameText, setRenameText] = useState(title);
	const [level, setLevel] = useState(0);

	const { onMenuClick } = useContext(ComponentContext);
	const { fileTree, openFile, turnOffRenameState, changeFileTitle, renameStateInfo } = useContext(FileContext);

	useOutsideAlerter(fileRef, () => onRenameOutsideClick(), ["resizable-drag-line"]);

	const isRenaming = renameStateInfo.isActive && renameStateInfo.fileId === id;

	useEffect(() => {
		setRenameText(title);
	}, [isRenaming]);

	useEffect(() => {
		setLevel(getFileLevel(id, fileTree));
	}, [fileTree]);

	const onRenameOutsideClick = () => {
		if (isRenaming) {
			turnOffRenameState(id);
			changeFileTitle(id, renameText);
		}
	};

	const onRenameChange = e => {
		setRenameText(e.target.value);
	};

	const onKeyDown = e => {
		if (e.key === "Enter") {
			e.target.blur();
			onRenameOutsideClick();
		}
	};

	return isFolder ? (
		<Fragment>
			<div className="folder" ref={fileRef}>
				{isRenaming ? (
					<div
						style={{
							marginLeft: `${level * levelIndentStep}px`,
						}}
						className="one-liner"
					>
						<Icon type="arrow" customStyle={isOpen ? "arrow-open" : "arrow"} />
						<input
							autoFocus={true}
							value={renameText}
							className="folder-rename"
							onChange={onRenameChange}
							onKeyDown={onKeyDown}
						/>
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
			autoFocus={true}
			ref={fileRef}
			value={renameText}
			className="folder-rename"
			style={{ marginLeft: `${level * levelIndentStep}px` }}
			onChange={onRenameChange}
			onKeyDown={onKeyDown}
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
