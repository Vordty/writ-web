import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { GET_USERS } from "../queries/UserQueries";

import { useLazyQuery } from "@apollo/react-hooks";

import Background from "../components/Background/Background";
import Card from "../components/Card/Card";
import Text from "../components/Text/Text";
import Spacer from "../components/Spacer/Spacer";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";

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
		<Background pattern="dots">
			<Card>
				<div className="mt">
					<Text type="title">LOGIN</Text>
				</div>
				<Spacer count="18" symbol="~" symbolSize="medium" />
				<Input containerStyle="mb" placeholder="Type your email" />
				<Input hidden={true} placeholder="Type your password" />
				<Spacer count="18" symbol="~" symbolSize="medium" />
				<Button type="btn-solid" style="capitalize">
					Log In
				</Button>
				<div className="mb-8 mt-2">
					<Button type="btn-ghost" isSmall={true}>
						Forgot Credentials?
					</Button>
				</div>
			</Card>
		</Background>
	);
};

export default Auth;
