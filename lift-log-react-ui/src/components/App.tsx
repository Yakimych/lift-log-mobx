import React from "react";
import { observer } from "mobx-react";
import AddLogEntry from "./AddLogEntry";
import { MainStore } from "lift-log-core/lib/store";
import LogEntryList from "./LogEntryList";

const App = observer(({ store }: { store: MainStore }) => (
  <div className="App">
    <header className="app-header">
      LiftLog
      <div>{store.isLoading ? "Loading..." : store.errorMessage}</div>
    </header>
    <div className="content">
      <AddLogEntry store={store} />
      <LogEntryList store={store} />
    </div>
  </div>
));

export default App;
