import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import Background from "../../components/Background/Background";
import Card from "../../components/Card/Card";
import Text from "../../components/Text/Text";
import Spacer from "../../components/Spacer/Spacer";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
	const [form, setForm] = useState({
		email: "",
		password: ""
	});

	const { login } = useContext(AuthContext);

	const onChange = e => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	const onLogin = () => {
		login(form);
	};

	return (
		<Background pattern="dots">
			<Button type="btn-ghost" style="capitalize corner-tr mt-4 mr-4">
				<Link to="/signup">Sign Up</Link>
			</Button>
			<Card>
				<div className="mtpc-5">
					<Text type="title">LOGIN</Text>
				</div>
				<Spacer count="18" symbol="~" />
				<Input
					containerStyle="mb"
					placeholder="Type your email"
					name="email"
					value={form.email}
					onChange={onChange}
				/>
				<Input
					hidden={true}
					placeholder="Type your password"
					name="password"
					value={form.password}
					onChange={onChange}
				/>
				<Spacer count="18" symbol="~" />
				<Button type="btn-solid" style="capitalize" onClick={onLogin}>
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
