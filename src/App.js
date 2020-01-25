import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Login from "./routes/Login/Login";
import Signup from "./routes/Signup/Signup";
import Main from "./routes/Main/Main";
import Verification from "./routes/Verification/Verification";

import PrivateRoute from "./routes/Auth/PrivateRoute";
import AuthRoute from "./routes/Auth/AuthRoute";

import { AuthProvider } from "./contexts/AuthContext";

function App() {
	return (
		<AuthProvider>
			<div className="App">
				<Router>
					<Switch>
						<Redirect exact from="/" to="/app" />
						<AuthRoute path="/login" component={Login} redirectPath="/app" />
						<AuthRoute path="/signup" component={Signup} redirectPath="/app" />
						<Route path="/verification" component={Verification} />
						<PrivateRoute path="/app" component={Main} />
					</Switch>
				</Router>
			</div>
		</AuthProvider>
	);
}

export default App;
