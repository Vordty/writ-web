import React, { createContext, useState } from "react";

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
	const [error, setError] = useState(null);

	const addError = (message, status) => {
		setError({ message, status });
	};

	const removeError = () => {
		setError(null);
	};

	return <ErrorContext.Provider value={{ error, addError, removeError }}>{children}</ErrorContext.Provider>;
};
