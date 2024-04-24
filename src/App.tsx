import { codeTokenNoValid } from "constants/config";

import { useMeProfile } from "api/user/queries/meProfile";
import { DetailUserProfile } from "api/user/types";
import LayoutBuilder from "components/layoutBuilder";
import PageLoader from "components/loaders/pageLoader";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import Routes from "services/router/config";
import { Dispatch } from "store/types";
import { actions as userActions } from "store/user";
import { user as user_selector } from "store/user/user.selectors";
import { initializeState } from "store/user/user.slice";

function App() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch<Dispatch>();

  initializeState();

  const { accessToken } = useSelector(user_selector);

  const {
    data: userProfile,
    isLoading: isLoadingUserProfile,
    refetch: refetchUserProfile,
    error: errorGetProfile,
  } = useMeProfile<DetailUserProfile>();

  const errorCodeProfile = errorGetProfile?.response?.data.code || null;

  if (errorCodeProfile && errorCodeProfile === codeTokenNoValid) {
    dispatch(userActions.logout());
  }

  useEffect(() => {
    if (accessToken) {
      refetchUserProfile().then((res) =>
        dispatch(userActions.updateUser(res.data || null))
      );
    } else {
      dispatch(userActions.logout());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  useEffect(() => {
    checkAuth();

    const tokenCheckInterval = setInterval(() => {
      checkAuth();
    }, 30000);

    return () => clearInterval(tokenCheckInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, userProfile]);

  const checkAuth = () => {
    if (!isLoadingUserProfile) {
      if (
        (!accessToken || !userProfile) &&
        !location.pathname.includes("auth")
      ) {
        history.push("/auth/sign-in");
      } else if (
        userProfile &&
        accessToken &&
        location.pathname.includes("auth")
      ) {
        history.push("/profile");
      } else if (
        (accessToken && !userProfile) ||
        (!accessToken && userProfile)
      ) {
        dispatch(userActions.logout());
      }
    }
  };

  if (accessToken && isLoadingUserProfile) {
    return <PageLoader />;
  }

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
