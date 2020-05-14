import React, { useContext } from "react";

import ListDraggable from "../../components/List/ListDraggable/ListDraggable";

import "./OpenedFiles.scss";
import Icon from "../../components/Icon/Icon";
import { FileContext } from "../../contexts/FileContext";

const OpenedFiles = ({ children, style }) => {
	const { getFileOnlyTree, displayFile, closeFile } = useContext(FileContext);

	const filterFileTree = () => {
		const filteredFileTree = getFileOnlyTree().filter(file => file.isOpen);

		filteredFileTree.sort((a, b) => {
			return a.order - b.order;
		});

		return filteredFileTree;
	};

	return (
		filterFileTree().length > 0 && (
			<div className="opened-files-container pl-4">
				<ListDraggable itemStyle="opened-file">
					{filterFileTree().map(openedFile => (
						<div
							key={`file-${openedFile.id}`}
							className="opened-file-inner"
							onClick={() => displayFile(openedFile.id)}
						>
							<div className="overflow-dots">{openedFile.title}</div>
							<Icon
								type="x"
								customStyle="opened-file-x cursor-pointer"
								onClick={() => closeFile(openedFile.id)}
							/>
						</div>
					))}
				</ListDraggable>
			</div>
		)
	);
};

export default OpenedFiles;
