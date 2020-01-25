import React, { createContext, useState, useEffect } from "react";

import { useLazyQuery, useQuery, useMutation } from "@apollo/react-hooks";
import { SIGNUP, LOGIN, GET_AUTHENTICATED_USER, SIGNUP_TEST } from "../queries/AuthQueries";
import { AuthToken } from "../helpers/Auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const token = AuthToken.GET();
	const [isAuthenticated, setIsAuthenticated] = useState(token ? true : false);
	const [signupTestMutation] = useMutation(SIGNUP_TEST);
	const [loginMutation] = useMutation(LOGIN);
	const [user, setUser] = useState({
		email: localStorage.getItem("EMAIL")
	});

	const signupTest = async ({ email, username, password, rePassword }) => {
		const {
			data: { signupTest }
		} = await signupTestMutation({
			variables: {
				email,
				username,
				password,
				rePassword
			}
		});

		setUser({ email: email });
		localStorage.setItem("EMAIL", email);

		console.log("Signup Data", signupTest);

		return signupTest;
	};

	const login = async ({ email, password }) => {
		const {
			data: { login }
		} = await loginMutation({
			variables: {
				email,
				password
			}
		});

		const token = AuthToken.GET();
		if (isAuthenticated || token) {
			console.log("Already logged in");
			return login;
		}

		if (login.success) {
			console.log("Logging In...");
			AuthToken.SET(login.token);
			setIsAuthenticated(true);
		}

		console.log("Login Data", login);

		return login;
	};

	const logout = () => {
		const token = AuthToken.GET();
		if (isAuthenticated || token) {
			setIsAuthenticated(false);
			AuthToken.REMOVE();
			console.log("Logging Out...");
		} else {
			console.log("You are not logged in to logout");
		}
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, user, signupTest, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
