import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { GET_USERS } from "../queries/UserQueries";

import { useLazyQuery } from "@apollo/react-hooks";

import Text from "../components/Text/Text";

export const Auth = () => {
	const { isAuthenticated, login, logout, signup } = useContext(AuthContext);

	const [getUsersQuery, { loading, data, error }] = useLazyQuery(GET_USERS);

	if (loading && !data) return "Loading...";
	if (error) return `Error! ${error.message}`;

	const onSignup = () => {
		signup();
	};

	const onLogin = () => {
		login();
	};

	const onLogout = () => {
		logout();
	};

	const onGetUsers = async () => {
		getUsersQuery();
		if (data) {
			console.log("data", data);
		}
	};

	return (
		<div>
			<Text type="canon">Test canon font size</Text>
			<Text type="trafalgar">Test canon font size</Text>
			<h3>isAuthenticated: {isAuthenticated ? "True" : "False"}</h3>
			<button onClick={onSignup}>Signup</button>
			<button onClick={onLogin}>Login</button>
			<button onClick={onLogout}>Logout</button>
			<button onClick={onGetUsers}>Get Users</button>

			<h4>USERS</h4>
			<div>{data && data.users.map(user => <div>{user.firstName}</div>)}</div>
		</div>
	);
};

export default Auth;
