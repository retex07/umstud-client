import LayoutBuilder from "components/layoutBuilder";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import Routes from "services/router/config";

import { useMeProfile } from "./api/queries/user";
import { DetailUserProfile } from "./api/queries/user/types";
import { Dispatch } from "./store/types";
import { actions as userActions } from "./store/user";
import { user as user_selector } from "./store/user/user.selectors";
import { initializeState } from "./store/user/user.slice";

function App() {
  const dispatch = useDispatch<Dispatch>();
  const history = useHistory();
  const location = useLocation();

  initializeState();

  const { accessToken } = useSelector(user_selector);

  const {
    data: userProfile,
    isLoading: isLoadingUserProfile,
    refetch: refetchUserProfile,
  } = useMeProfile<DetailUserProfile>();

  useEffect(() => {
    if (accessToken) {
      refetchUserProfile().then((res) =>
        dispatch(userActions.updateUser(res.data || null))
      );
    }
  }, [accessToken]);

  useEffect(() => {
    const checkAuth = () => {
      if (
        (!accessToken || !userProfile) &&
        location.pathname !== "/" &&
        location.pathname !== "/auth/sign-up"
      ) {
        history.push("/auth/sign-in");
      } else if (
        userProfile &&
        accessToken &&
        location.pathname.includes("auth")
      ) {
        history.push("/profile");
      }
    };

    checkAuth();

    const tokenCheckInterval = setInterval(() => {
      checkAuth();
    }, 30000);

    return () => clearInterval(tokenCheckInterval);
  }, [accessToken, userProfile, history, location.pathname]);

  useEffect(() => {
    if (accessToken && userProfile && !isLoadingUserProfile && userProfile) {
      dispatch(userActions.updateUser(userProfile));
    }
  }, [accessToken, userProfile, isLoadingUserProfile, userProfile, dispatch]);

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
