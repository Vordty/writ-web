import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

const AuthRoute = ({ component: Component, redirectPath, ...rest }) => {
	const { isAuthenticated } = useContext(AuthContext);

	return (
		<Route
			{...rest}
			render={props => (!isAuthenticated ? <Component {...props} /> : <Redirect to={redirectPath} />)}
		/>
	);
};

export default AuthRoute;
