import LayoutBuilder from "components/layoutBuilder";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import Routes from "services/router/config";

import { useMeProfile } from "./api/queries/user";
import { DetailUserProfile } from "./api/queries/user/types";
import { Dispatch } from "./store/types";
import { actions as userActions } from "./store/user";
import { State as UserState } from "./store/user/user.types";

function App() {
  const dispatch = useDispatch<Dispatch>();
  const history = useHistory();
  const location = useLocation();

  const { data: userProfile, isLoading: isLoadingUserProfile } =
    useMeProfile<DetailUserProfile>();
  const { accessToken } = useSelector((state: UserState) => state);

  useEffect(() => {
    const checkAuth = () => {
      if (
        !accessToken &&
        location.pathname !== "/" &&
        location.pathname !== "/auth/sign-up"
      ) {
        history.push("/auth/sign-in");
      }
    };

    checkAuth();

    const tokenCheckInterval = setInterval(() => {
      checkAuth();
    }, 30000);

    return () => clearInterval(tokenCheckInterval);
  }, [accessToken, history, location.pathname]);

  useEffect(() => {
    if (accessToken && !isLoadingUserProfile && userProfile) {
      dispatch(userActions.updateUser(userProfile));
    }
    if (!accessToken) {
      dispatch(userActions.logout());
    }
  }, [accessToken, isLoadingUserProfile, userProfile, dispatch]);

  return (
    <Switch>
      <Route path="/" exact={false}>
        {() => (
          <Switch>
            {Routes.map((route) => (
              <Route
                key={route.path.toString()}
                path={route.path}
                exact={route.settings.exact}
                strict={route.settings.strict}
                sensitive={route.settings.sensitive}
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
        )}
      </Route>
    </Switch>
  );
}

export default App;
