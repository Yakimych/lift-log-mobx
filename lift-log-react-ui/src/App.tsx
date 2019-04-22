import React from "react";
import { observer } from "mobx-react";
import AddLogEntry from "./components/AddLogEntry";
import { MainStore } from "lift-log-core/lib/store";

const App = observer(({ store }: { store: MainStore }) => (
  <div className="App">
    <header className="app-header">LiftLog</header>
    <div className="content">
      <AddLogEntry store={store} />
    </div>
  </div>
));

export default App;
