import { History } from "history";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";

import { DetailUserProfile } from "@/api/user/types";
import LayoutBuilder from "@/components/layoutBuilder";
import PageLoader from "@/components/loaders/pageLoader";
import Routes from "@/services/router/config";
import urls from "@/services/router/urls";
import { initApp } from "@/store/actions/app";
import { selectIsLoadingApp } from "@/store/selectors/app";
import { selectAccessToken } from "@/store/selectors/auth";
import { selectUserData } from "@/store/selectors/user";
import { Dispatch, RootState } from "@/store/types";

interface PropsApp {
  initApp: (history: History) => void;
  userProfile: DetailUserProfile | null;
  accessToken: string | null;
  isLoadingApp: boolean;
}

function App(props: PropsApp) {
  const { initApp, accessToken, userProfile, isLoadingApp } = props;

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    initApp(history);
  }, []);

  useEffect(() => {
    if (
      userProfile &&
      accessToken &&
      location.pathname.includes(urls.auth.index)
    ) {
      history.push(urls.profile.index);
    }
  }, [userProfile]);

  if (isLoadingApp) {
    return <PageLoader />;
  }

  return (
    <Switch>
      <Route path={urls.index} exact={false}>
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

const mapStateToProps = (state: RootState) => ({
  accessToken: selectAccessToken(state),
  userProfile: selectUserData(state),
  isLoadingApp: selectIsLoadingApp(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  initApp: (history: History) => dispatch(initApp({ history })),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
