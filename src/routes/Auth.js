import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const Auth = () => {
	const { isAuthenticated, login, logout, signup } = useContext(AuthContext);

	const onSignup = () => {
		signup();
	};

	const onLogin = () => {
		login();
	};

	const onLogout = () => {
		logout();
	};

	return (
		<div>
			<h3>isAuthenticated: {isAuthenticated ? "True" : "False"}</h3>
			<button onClick={onSignup}>Signup</button>
			<button onClick={onLogin}>Login</button>
			<button onClick={onLogout}>Logout</button>
		</div>
	);
};

export default Auth;
