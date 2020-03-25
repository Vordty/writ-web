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
