import React from "react";
import { Switch, Route } from "react-router-dom";

import LayoutBuilder from "./components/layoutBilder";
import Routes from "./services/router/config";
import { getRoutePath } from "./services/router/router.utils";

function App() {
  return (
    <Switch>
      <Route path="/" exact={false}>
        {(routeProps) => (
          <Switch>
            {Routes.map((route) => (
              <Route
                key={route.path.toString()}
                path={getRoutePath(route.path, routeProps.match?.path)}
                exact={route.settings.exact}
                strict={route.settings.strict}
                sensitive={route.settings.sensitive}
                render={() => <LayoutBuilder component={route.component} />}
              />
            ))}
          </Switch>
        )}
      </Route>
    </Switch>
  );
}

export default App;
