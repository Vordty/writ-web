import React from "react";

import Background from "../../components/Background/Background";
import Card from "../../components/Card/Card";
import Text from "../../components/Text/Text";
import Spacer from "../../components/Spacer/Spacer";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

const Login = () => {
	return (
		<Background pattern="dots">
			<Button type="btn-ghost" style="capitalize corner-tr mt-4 mr-4">
				Sign Up
			</Button>
			<Card>
				<div className="mtpc-5">
					<Text type="title">LOGIN</Text>
				</div>
				<Spacer count="18" symbol="~" />
				<Input containerStyle="mb" placeholder="Type your email" />
				<Input hidden={true} placeholder="Type your password" />
				<Spacer count="18" symbol="~" />
				<Button type="btn-solid" style="capitalize">
					Log In
				</Button>
				<div className="mbpc-5 mt-2">
					<Button type="btn-ghost" textType="small">
						Forgot Credentials?
					</Button>
				</div>
			</Card>
		</Background>
	);
};

export default Login;
