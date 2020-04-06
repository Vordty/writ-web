import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { sortFiles, getBranchMembers, getFileParent, getFileLevel } from "helpers/FileContextHelpers";
import { UPDATE_FILETREE, GET_FILETREE } from "queries/FileQueries";
import { FILE_CREATE, FOLDER_CREATE } from "schemas/FIleSchema";
import { ErrorContext } from "./ErrorContext";

export const FileContext = createContext();

export const FileProvider = ({ children }) => {
	const { addError } = useContext(ErrorContext);
	const { loading, error, data } = useQuery(GET_FILETREE);

	const [updateFileTreeMutation] = useMutation(UPDATE_FILETREE);

	const [fileTree, setFileTree] = useState([]);

	const getFileTree = () => {
		return sortFiles(fileTree);
	};

	const [displayedFile, setDisplayedFile] = useState({});
	const [renameStateInfo, setRenameStateInfo] = useState({
		isActive: false,
		fileId: null,
		firstTime: false,
	});
	const [copiedItem, setCopiedItem] = useState({});

	useEffect(() => {
		function onUnload(e) {
			e.preventDefault();
			updateFileTree(fileTree);
		}
		window.addEventListener("beforeunload", onUnload);

		return () => {
			window.removeEventListener("beforeunload", onUnload);
		};
	});

	useEffect(() => {
		if (data) {
			console.log("QUERY DATA", data);
			setFileTree(data.fileTree.data);
		}
	}, [data]);

	const updateFileTree = async newData => {
		const result = await updateFileTreeMutation({
			variables: {
				id: data.fileTree.id,
				data: newData,
			},
		});

		const success = result.data.updateFileTree.success;
		const message = result.data.updateFileTree.message;

		if (!success) {
			addError(message, success);
		} else {
			setFileTree(newData);
		}

		console.log("MUTATION RESULT", result);
	};

	//#region ERROR HANDLING

	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;

	//#endregion

	const closeFile = id => {
		console.log("CLOSE FILE " + id);

		setFileTree(fileTree.map(file => (file.id === id ? { ...file, isOpen: false } : file)));
	};

	const openFile = id => {
		console.log("OPEN FILE " + id);

		if (isAlreadyOpen(id)) {
			return;
		}

		displayFile(id);
		setFileTree(fileTree.map(file => (file.id === id ? { ...file, isOpen: true } : file)));
	};

	const moveFile = (title, toTitle) => {
		const file = fileTree.find(file => file.title === title);
		let toFile = fileTree.find(file => file.title === toTitle);

		if (!toFile) return;

		if (!toFile.isFolder) {
			const toFileParent = getFileParent(toFile, fileTree);
			toFile = toFileParent;
		}

		if (!toFile) return;
		if (
			(getFileLevel(file.id, fileTree) < getFileLevel(toFile.id, fileTree) && file.isFolder) ||
			file.id === toFile.id
		)
			return;

		const fileTreeCopy = fileTree.slice();

		for (let _file in fileTreeCopy) {
			if (fileTreeCopy[_file].id === file.id) {
				fileTreeCopy[_file].parentId = toFile.id;
			}
		}

		updateFileTree(fileTreeCopy);
	};

	const moveFileToRoot = title => {
		console.log("TO ROOT " + title);

		const fileTreeCopy = fileTree.slice();

		for (let file in fileTreeCopy) {
			if (fileTreeCopy[file].title === title) {
				fileTreeCopy[file].parentId = -1;
			}
		}

		updateFileTree(fileTreeCopy);
	};

	const renameFile = id => {
		setRenameStateInfo({ isActive: true, fileId: id, firstTime: false });
	};

	const changeFileTitle = (id, newTitle) => {
		let fileTreeCopy = fileTree.slice();

		if (newTitle.length === 0) {
			if (renameStateInfo.firstTime) {
				deleteFile(id);
			}
		} else {
			for (let file in fileTreeCopy) {
				if (fileTreeCopy[file].id === id) {
					fileTreeCopy[file].title = newTitle;
				}
			}
			updateFileTree(fileTreeCopy);
		}
	};

	const turnOffRenameState = () => {
		setRenameStateInfo({ isActive: false, fileId: null, firstTime: false });
	};

	const copyFile = id => {
		console.log("Copy File", id);

		let file = fileTree.find(file => file.id === id);
		console.log("FILE TO BE COPIED", file);

		setCopiedItem(file);
	};

	const pasteFile = id => {
		console.log("Paste File In", id);

		const fileTreeCopy = fileTree.slice();

		for (let file in fileTreeCopy) {
			if (fileTreeCopy[file].id === copiedItem.id) {
				fileTreeCopy[file].parentId = id;
			}
		}

		updateFileTree(fileTreeCopy);
	};

	const deleteFile = id => {
		console.log("Delete File", id);

		const fileTreeCopy = fileTree.filter(file => file.id !== id);

		updateFileTree(fileTreeCopy);
	};

	const deleteFolder = id => {
		console.log("Delete File", id);

		const branchMembers = getBranchMembers(id, fileTree);

		const fileTreeCopy = fileTree.filter(file => !branchMembers.includes(file));
		console.log("fileTreeCopy", fileTreeCopy);

		updateFileTree(fileTreeCopy);
	};

	const createFile = parentId => {
		console.log("Create File", parentId);

		const newFile = FILE_CREATE({ parentId: parentId });

		console.log("NEW FILE", newFile);

		setFileTree([...fileTree, newFile]);

		setRenameStateInfo({ isActive: true, fileId: newFile.id, firstTime: true });
	};

	const createFolder = parentId => {
		console.log("Create Folder", parentId);

		const newFolder = FOLDER_CREATE({ parentId: parentId });

		console.log("NEW FOLDER", newFolder);

		setFileTree([...fileTree, newFolder]);

		setRenameStateInfo({ isActive: true, fileId: newFolder.id, firstTime: true });
	};

	const displayFile = id => {
		setDisplayedFile(fileTree.find(file => file.id === id));
	};

	const isAlreadyOpen = id => {
		return fileTree.find(file => file.id === id).isOpen;
	};

	const toggleFolder = id => {
		setFileTree(fileTree.map(file => (file.id === id ? { ...file, isOpen: !file.isOpen } : file)));
	};

	const getFileOnlyTree = () => {
		return fileTree.filter(file => !file.isFolder);
	};

	return (
		<FileContext.Provider
			value={{
				fileTree,
				getFileTree,
				getFileOnlyTree,
				displayedFile,
				displayFile,
				closeFile,
				toggleFolder,
				openFile,
				moveFile,
				moveFileToRoot,
				renameFile,
				changeFileTitle,
				copyFile,
				pasteFile,
				deleteFile,
				deleteFolder,
				createFile,
				createFolder,
				renameStateInfo,
				turnOffRenameState,
			}}
		>
			{children}
		</FileContext.Provider>
	);
};
