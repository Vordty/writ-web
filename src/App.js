import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Login from "./routes/Login/Login";
import Signup from "./routes/Signup/Signup";
import Editor from "./routes/Editor/Editor";
import Verification from "./routes/Verification/Verification";
import Projects from "./routes/Projects/Projects";

import PrivateRoute from "./routes/RouteTypes/PrivateRoute";
import AuthRoute from "./routes/RouteTypes/AuthRoute";

import { AuthProvider } from "./contexts/AuthContext";
import { ComponentProvider } from "./contexts/ComponentContext";
import { FileProvider } from "./contexts/FileContext";
import { ErrorProvider } from "contexts/ErrorContext";

function App() {
	return (
		<ErrorProvider>
			<AuthProvider>
				<FileProvider>
					<ComponentProvider>
						<div className="App">
							<Router>
								<Switch>
									<Redirect exact from="/" to="/app" />
									<AuthRoute path="/login" component={Login} redirectPath="/app" />
									<AuthRoute
										path="/signup"
										component={Signup}
										redirectPath="/app"
									/>
									<Route path="/verification" component={Verification} />
									<PrivateRoute path="/projects" component={Projects} />
									<PrivateRoute path="/app" component={Editor} />
								</Switch>
							</Router>
						</div>
					</ComponentProvider>
				</FileProvider>
			</AuthProvider>
		</ErrorProvider>
	);
}

export default App;
