import React from "react";
import { Switch, Route } from "react-router-dom";

import IndexPage from "./pages/index";

function App() {
  return (
    <Switch>
      <Route path="/" render={() => <IndexPage />} />
    </Switch>
  );
}

export default App;
