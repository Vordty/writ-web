import React, { createContext, useState } from "react";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { SIGNUP, LOGIN } from "../queries/AuthQueries";
import { AuthToken } from "../helpers/Auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const token = AuthToken.GET();
	const [isAuthenticated, setIsAuthenticated] = useState(token ? true : false);

	const [signupMutation] = useMutation(SIGNUP);
	const [loginMutation] = useMutation(LOGIN);

	const signup = async ({ email, username, password, rePassword }) => {
		const {
			data: { signup }
		} = await signupMutation({
			variables: {
				email,
				username,
				password,
				rePassword
			}
		});

		console.log("Signup Data", signup);
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
			return;
		}

		if (login.success) {
			console.log("Logging In...");
			AuthToken.SET(login.token);
			setIsAuthenticated(true);
		}

		console.log("Login Data", login);
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

	return <AuthContext.Provider value={{ isAuthenticated, signup, login, logout }}>{children}</AuthContext.Provider>;
};
