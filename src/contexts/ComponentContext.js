import React, { createContext, useState, useRef, useEffect, useContext } from "react";
import { useToasts } from "react-toast-notifications";

import ContextMenu from "../components/Shared/ContextMenu/ContextMenu";
import ContextMenuItem from "../components/Shared/ContextMenu/ContextMenuItem/ContextMenuItem";

import { useOutsideAlerter } from "../helpers/OutsideClick";
import { positionMenu } from "../helpers/PositionContextMenu";
import MENU_SCHEMA from "../schemas/MenuSchema";
import { FileContext } from "./FileContext";
import { ErrorContext } from "contexts/ErrorContext";

export const ComponentContext = createContext();

export const ComponentProvider = ({ children }) => {
	const contextMenuRef = useRef(null);
	useOutsideAlerter(contextMenuRef, () => hideContextMenu());

	const fileContext = useContext(FileContext);
	const { error, removeError } = useContext(ErrorContext);

	const { addToast, removeAllToasts } = useToasts();

	const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
	const [menuType, setMenuType] = useState("");
	const [lastEvent, setLastEvent] = useState();
	const [passedItem, setPassedItem] = useState();

	useEffect(() => {
		if (isContextMenuOpen) {
			positionMenu(lastEvent, contextMenuRef.current);
		}
	}, [isContextMenuOpen]);

	useEffect(() => {
		if (error && !error.status) {
			removeAllToasts();
			renderError();
		}
	}, [error]);

	const showContextMenu = e => {
		setIsContextMenuOpen(true);
	};

	const hideContextMenu = () => {
		setIsContextMenuOpen(false);
	};

	const onMenuClick = (e, type, fileId) => {
		e.persist();
		e.preventDefault();
		e.stopPropagation();
		setLastEvent(e);
		setPassedItem(fileId);
		setMenuType(type);
		showContextMenu(e);
	};

	const getContextMenuItems = () => {
		const result = MENU_SCHEMA(menuType, fileContext, passedItem, hideContextMenu);

		const items = result.map(item => (
			<ContextMenuItem onClick={item.action} key={item.title}>
				{item.title}
			</ContextMenuItem>
		));

		return items;
	};

	const renderContextMenu = () => {
		return <ContextMenu menuRef={contextMenuRef} items={getContextMenuItems} />;
	};

	const renderError = () => {
		addToast(error.message, { appearance: "error", autoDismiss: true, autoDismissTimeout: 3000 });
	};

	return (
		<ComponentContext.Provider value={{ showContextMenu, hideContextMenu, onMenuClick }}>
			{children}
			{isContextMenuOpen && renderContextMenu()}
		</ComponentContext.Provider>
	);
};
