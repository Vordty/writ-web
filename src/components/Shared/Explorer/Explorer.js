import React, { useState, useRef, useContext, useEffect } from "react";

import File from "./File/File";
import ListDraggable from "../../List/ListDraggable/ListDraggable";

import "./Explorer.scss";
import Icon from "../../Icon/Icon";
import Overlay from "components/Overlay/Overlay";

import { ComponentContext } from "../../../contexts/ComponentContext";
import { FileContext } from "../../../contexts/FileContext";

const levelIndentStep = 20;

const Explorer = ({ contentWidth }) => {
	const explorerBodyRef = useRef(null);

	const { onMenuClick } = useContext(ComponentContext);
	const { fileTree, getFileTree, toggleFolder, moveFile, moveFileToRoot, renameStateInfo } = useContext(
		FileContext
	);

	const [overlayDimensions, setOverlayDimensions] = useState({ width: 0, height: 0 });

	useEffect(() => {
		if (fileTree.length === 0) return;

		if (
			explorerBodyRef.current.childNodes[0].className === "folder" ||
			explorerBodyRef.current.childNodes[0].className === "file"
		) {
			explorerBodyRef.current.childNodes[0].style.paddingTop = "10px";
		}
		setOverlayDimensions({
			width: contentWidth,
			height: explorerBodyRef.current.clientHeight
		});
	}, [explorerBodyRef, contentWidth, fileTree]);

	let startTarget;
	const onDragStart = e => {
		e.persist();
		startTarget = e.target;
	};

	const onDragOver = e => {
		e.preventDefault();
	};

	const onDrop = e => {
		e.persist();
		e.preventDefault();

		if (e.target.className === "explorer-body") {
			moveFileToRoot(startTarget.innerText);
		} else {
			moveFile(startTarget.innerText, e.target.innerText);
		}
	};

	const renderExplorerBody = () => {
		const items = [];

		const topLevelFiles = getFileTree().filter(item => item.parentId === -1);
		topLevelFiles.map(item => {
			if (item.isFolder) {
				items.push(renderFolder(item));
			} else {
				items.push(renderFile(item));
			}
		});

		return items;
	};

	const renderFile = file => {
		return <File draggable key={file.id} file={file} levelIndentStep={levelIndentStep} />;
	};

	const renderFolder = folder => {
		const folderChildren = getFileTree().filter(item => item.parentId === folder.id);

		return (
			<File
				draggable
				key={folder.id}
				file={folder}
				levelIndentStep={levelIndentStep}
				onClick={() => toggleFolder(folder.id)}
			>
				{folderChildren.map(item => {
					const items = [];
					if (item.isFolder) {
						items.push(renderFolder(item));
					} else {
						items.push(renderFile(item));
					}

					return items;
				})}
			</File>
		);
	};

	let explorerBodyProps = {};
	if (!renameStateInfo.isActive) {
		explorerBodyProps = { onDragOver: onDragOver, onDrop: onDrop, onDragStart: onDragStart };
	}

	return (
		<div className="explorer">
			<div className="project-title">
				<div className="project-title-text">Interstellar</div>
				<Icon type="dot3" onClick={e => onMenuClick(e, "projectTitle")} />
			</div>
			<div className="explorer-body" ref={explorerBodyRef} {...explorerBodyProps}>
				{renameStateInfo.isActive && (
					<Overlay
						customStyle="event-transparent explorer"
						style={{ width: overlayDimensions.width, height: overlayDimensions.height }}
					/>
				)}
				{renderExplorerBody()}
			</div>
		</div>
	);
};

export default Explorer;
