export const sortFiles = fileTree => {
	let fileTreeCopy = fileTree.slice();

	const onlyFolders = fileTreeCopy.filter(file => {
		return file.isFolder;
	});
	onlyFolders.sort((a, b) => a.title.localeCompare(b.title));

	const onlyFiles = fileTreeCopy.filter(file => {
		return !file.isFolder;
	});
	onlyFiles.sort((a, b) => a.title.localeCompare(b.title));

	const combined = onlyFolders.concat(onlyFiles);

	return combined;
};

export const getBranchMembers = (id, fileTree) => {
	const branchMembers = [];

	const branchTopLevelChildren = fileTree.filter(file => file.parentId === id);

	branchTopLevelChildren.map(file => {
		if (file.isFolder) {
			branchMembers.push(file);
			const getFolderChildrenRec = trampoline(getFolderChildren);
			getFolderChildrenRec(file.id, branchMembers, fileTree);
		} else {
			branchMembers.push(file);
		}
	});

	branchMembers.push(fileTree.find(file => file.id === id));

	return branchMembers;
};

const getFolderChildren = (id, container, fileTree) => {
	const folderChildren = fileTree.filter(file => file.parentId === id);

	let funcResult;

	folderChildren.map(file => {
		if (file.isFolder) {
			container.push(file);
			funcResult = () => getFolderChildren(file.id, container, fileTree);
		} else {
			container.push(file);
		}
	});

	return funcResult;
};

const trampoline = fn => (...args) => {
	let result = fn(...args);
	while (typeof result === "function") {
		result = result();
	}

	return result;
};
