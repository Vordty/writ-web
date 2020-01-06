import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Auth from "./routes/Auth";
import Writ from "./routes/Writ";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
	return (
		<AuthProvider>
			<div className="App">
				<Router>
					<Switch>
						{/* check if authenticated and decide route */}
						<Route path="/auth">
							<Auth />
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
