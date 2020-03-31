import React, { createContext, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { sortFiles, getBranchMembers } from "helpers/FileContextHelpers";
import { UPDATE_FILETREE, GET_FILETREE } from "queries/FileQueries";

export const FileContext = createContext();

export const FileProvider = ({ children }) => {
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
		firstTime: false
	});
	const [copiedItem, setCopiedItem] = useState({});

	useEffect(() => {
		if (data) {
			console.log("QUERY DATA", data);
			setFileTree(data.fileTree.data);
		}
	}, [data]);

	//#region ERROR HANDLING

	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;

	//#endregion

	const updateFileTree = async newData => {
		const result = await updateFileTreeMutation({
			variables: {
				id: data.fileTree.id,
				data: newData
			}
		});

		console.log("MUTATION RESULT", result);
	};

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
			const toFileParent = getFileParent(toFile);
			toFile = toFileParent;
		}

		if (!toFile) return;
		if ((file.level < toFile.level && file.isFolder) || file.id === toFile.id) return;

		console.log("INFO", file, toFile);
		setFileTree(
			fileTree.map(f => (f.id === file.id ? { ...file, level: toFile.level + 1, parentId: toFile.id } : f))
		);
	};

	const moveFileToRoot = title => {
		console.log("TO ROOT " + title);

		const fileTreeCopy = fileTree.slice();

		for (let file in fileTreeCopy) {
			if (fileTreeCopy[file].title === title) {
				fileTreeCopy[file].level = 1;
				fileTreeCopy[file].parentId = -1;
			}
		}

		setFileTree(fileTreeCopy);
	};

	const renameFile = id => {
		setRenameStateInfo({ isActive: true, fileId: id, firstTime: false });
	};

	const changeFileTitle = (id, newTitle) => {
		const fileTreeCopy = fileTree.slice();

		for (let file in fileTreeCopy) {
			if (fileTreeCopy[file].id === id) {
				fileTreeCopy[file].title = newTitle;
			}
		}

		setFileTree(fileTreeCopy);
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

		let parentFile = fileTree.find(file => file.id === id);

		for (let file in fileTreeCopy) {
			if (fileTreeCopy[file].id === copiedItem.id) {
				fileTreeCopy[file].parentId = id;
				fileTreeCopy[file].level = parentFile.level + 1;
			}
		}

		console.log("fileTreeCopy", fileTreeCopy);
		setFileTree(fileTreeCopy);
	};

	const deleteFile = id => {
		console.log("Delete File", id);

		const fileTreeCopy = fileTree.filter(file => file.id !== id);

		setFileTree(fileTreeCopy);
	};

	const deleteFolder = id => {
		console.log("Delete File", id);

		const branchMembers = getBranchMembers(id, fileTree);

		const fileTreeCopy = fileTree.filter(file => !branchMembers.includes(file));
		console.log("fileTreeCopy", fileTreeCopy);

		setFileTree(fileTreeCopy);
	};

	const createFile = parentId => {
		console.log("Create File", parentId);

		let parentFile = fileTree.find(file => file.id === parentId);
		let level = 1;

		if (parentId !== -1) {
			level = parentFile.level + 1;
		}

		const newFile = {
			id: Math.random(),
			title: "",
			isFolder: false,
			parentId: parentId,
			level: level,

			isOpen: false,
			order: null
		};

		setFileTree([...fileTree, newFile]);

		setRenameStateInfo({ isActive: true, fileId: newFile.id, firstTime: true });

		updateFileTree([...fileTree, newFile]);
	};

	const createFolder = parentId => {
		console.log("Create Folder", parentId);

		let parentFile = fileTree.find(file => file.id === parentId);
		let level = 1;

		if (parentId !== -1) {
			level = parentFile.level + 1;
		}

		console.log("PARENT FILE", parentFile);

		const newFolder = {
			id: Math.random(),
			title: "",
			isFolder: true,
			parentId: parentId,
			level: level,

			isOpen: false,
			order: null
		};

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

	const getFileById = id => {
		return fileTree.find(f => f.id === id);
	};

	const getFileOnlyTree = () => {
		return fileTree.filter(file => !file.isFolder);
	};

	const getFileParent = file => {
		return fileTree.find(f => f.id === file.parentId);
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
				turnOffRenameState
			}}
		>
			{children}
		</FileContext.Provider>
	);
};
