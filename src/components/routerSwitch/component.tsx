import React from "react";
import { Route, Switch } from "react-router-dom";
import { Route as TRoute } from "services/router/types";

import LayoutBuilder from "../layoutBuilder";

interface Props {
  routes: TRoute[];
}

export default function RouterSwitch(props: Props) {
  return (
    <Switch>
      {props.routes.map((route) => (
        <Route
          key={route.path.toString()}
          path={route.path}
          {...route.settings}
          render={() => (
            <LayoutBuilder
              component={route.component}
              renderFooter={route.layoutSettings.withFooter}
              renderHeader={route.layoutSettings.withHeader}
            />
          )}
        />
      ))}
    </Switch>
  );
}
