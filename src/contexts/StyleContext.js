import React, { createContext, useState, useEffect } from "react";

export const StyleContext = createContext();

export const StyleProvider = ({ children }) => {
	const [windowDimensions, setWindowDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	const [panelDimensions, setPanelDimensions] = useState({
		sidebarDimensions: {
			width: 250,
			height: windowDimensions.height,
		},
		textEditorDimensions: {
			width: windowDimensions.width - 250,
			height: windowDimensions.height,
		},
	});

	useEffect(() => {
		console.log("windowDimensions CHANGED", windowDimensions);
	}, [windowDimensions]);

	useEffect(() => {
		setPanelDimensions({
			...panelDimensions,
			textEditorDimensions: {
				width: windowDimensions.width - panelDimensions.sidebarDimensions.width,
				height: windowDimensions.height,
			},
		});
	}, [panelDimensions.sidebarDimensions]);

	const setSidebarDimensions = (width = windowDimensions.width, height = windowDimensions.height) => {
		setPanelDimensions({
			...panelDimensions,
			sidebarDimensions: {
				width: width,
				height: height,
			},
		});
	};

	const getSidebarDimensions = () => {
		return panelDimensions.sidebarDimensions;
	};

	const getTextEditorDimensions = () => {
		return panelDimensions.textEditorDimensions;
	};

	return (
		<StyleContext.Provider
			value={{ panelDimensions, setSidebarDimensions, getSidebarDimensions, getTextEditorDimensions }}
		>
			{children}
		</StyleContext.Provider>
	);
};
