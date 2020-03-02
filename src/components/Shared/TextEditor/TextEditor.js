import React, { useContext } from "react";

import { FileContext } from "../../../contexts/FileContext";

import "./TextEditor.scss";

const TextEditor = () => {
	const { displayedFile } = useContext(FileContext);
	return <div className="text-editor">{displayedFile.title}</div>;
};

export default TextEditor;
