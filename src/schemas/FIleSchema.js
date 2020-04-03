import uuid from "react-uuid";

export const FILE_CREATE = props => {
	const id = props.id ? props.id : uuid();
	const title = props.title ? props.title : "";
	const order = props.iordersOpen ? props.order : null;
	const parentId = props.parentId;

	const newFile = {
		id: id,
		title: title,
		isFolder: false,
		parentId: parentId,
		isOpen: false,
		order: order,
	};

	return newFile;
};

export const FOLDER_CREATE = props => {
	const id = props.id ? props.id : uuid();
	const title = props.title ? props.title : "";
	const isOpen = props.isOpen ? props.isOpen : false;
	const order = props.iordersOpen ? props.order : null;
	const parentId = props.parentId;

	const newFolder = {
		id: id,
		title: title,
		isFolder: true,
		parentId: parentId,
		isOpen: isOpen,
		order: order,
	};

	return newFolder;
};
