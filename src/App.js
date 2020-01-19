import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./routes/Login/Login";
import Signup from "./routes/Signup/Signup";
import Writ from "./routes/Writ";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
	return (
		<AuthProvider>
			<div className="App">
				<Router>
					<Switch>
						<Route path="/login">
							<Login />
						</Route>
						<Route path="/signup">
							<Signup />
						</Route>
						<Route path="/app">
							<Writ />
						</Route>
					</Switch>
				</Router>
			</div>
		</AuthProvider>
	);
}

export default App;
