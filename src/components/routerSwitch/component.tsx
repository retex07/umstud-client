import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Route as TRoute } from "services/router/types";

import { getRoutePath } from "../../utils/router.utils";
import LayoutBuilder from "../layoutBuilder";

interface Props {
  routes: TRoute[];
}

export default function RouterSwitch(props: Props) {
  const { path: basePath } = useRouteMatch();

  return (
    <Switch>
      {props.routes.map((route) => (
        <Route
          key={route.path.toString()}
          path={getRoutePath(route.path, basePath)}
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
