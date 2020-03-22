const MENU_SCHEMA = (type, actions, item, callback) => {
	const { renameFile, copyFile, deleteFile, createFile, createFolder } = actions;

	const FILE_SCHEMA = [
		{
			title: "Copy",
			action: () => {
				copyFile();
				callback();
			}
		},
		{
			title: "Rename",
			action: () => {
				renameFile(item);
				callback();
			}
		},
		{
			title: "Delete",
			action: () => {
				deleteFile();
				callback();
			}
		}
	];

	const FOLDER_SCHEMA = [
		{
			title: "New File",
			action: () => {
				createFile();
				callback();
			}
		},
		{
			title: "New Folder",
			action: () => {
				createFolder();
				callback();
			}
		},
		{
			title: "Rename",
			action: () => {
				renameFile(item);
				callback();
			}
		},
		{
			title: "Delete",
			action: () => {
				deleteFile();
				callback();
			}
		}
	];

	const PROJECT_TITLE_SCHEMA = [{ title: "Rename", action: () => console.log("RENAME FILE ACTION") }];

	const getSchema = type => {
		switch (type) {
			case "file":
				return FILE_SCHEMA;
			case "folder":
				return FOLDER_SCHEMA;
			case "projectTitle":
				return PROJECT_TITLE_SCHEMA;
		}
	};

	return getSchema(type);
};

export default MENU_SCHEMA;
