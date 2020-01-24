import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Login from "./routes/Login/Login";
import Signup from "./routes/Signup/Signup";
import Main from "./routes/Main/Main";
import PrivateRoute from "./routes/Auth/PrivateRoute";

import { AuthProvider } from "./contexts/AuthContext";

function App() {
	return (
		<AuthProvider>
			<div className="App">
				<Router>
					<Switch>
						<Redirect exact from="/" to="/app" />
						<Route path="/login" component={Login} />
						<Route path="/signup" component={Signup} />
						<PrivateRoute path="/app" component={Main} />
					</Switch>
				</Router>
			</div>
		</AuthProvider>
	);
}

export default App;
