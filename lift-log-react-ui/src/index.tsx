import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import RemoteDevMainStore from "lift-log-core/lib/store";

const apiUrl = "http://localhost:5000/api/liftlogs/demo";
const store = new RemoteDevMainStore(apiUrl);
store.fetchLogEntries();

ReactDOM.render(<App store={store} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
