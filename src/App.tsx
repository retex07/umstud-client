import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";

import { ChatSocketEventData } from "@/api/handlers/chat/types";
import { DetailUserProfile } from "@/api/handlers/user/types";
import WebSocketService from "@/api/ws";
import LayoutBuilder from "@/components/layoutBuilder";
import PageLoader from "@/components/loaders/pageLoader";
import Routes from "@/services/router/config";
import urls, { PRIVATE_URLS } from "@/services/router/urls";
import { initApp } from "@/store/actions/app";
import { selectIsLoadingApp } from "@/store/selectors/app";
import { selectAccessToken } from "@/store/selectors/auth";
import { selectUserData } from "@/store/selectors/user";
import { Dispatch, RootState } from "@/store/types";

interface PropsApp {
  initApp: () => void;
  userProfile: DetailUserProfile | null;
  accessToken: string | null;
  isLoadingApp: boolean;
}

function App(props: PropsApp) {
  const { initApp, accessToken, userProfile, isLoadingApp } = props;
  const [isConnectedNotifications, setIsConnectedNotifications] =
    useState(false);

  const websocket = new WebSocketService();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    initApp();
  }, []);

  useEffect(() => {
    if (
      !isLoadingApp &&
      !isConnectedNotifications &&
      userProfile &&
      accessToken
    ) {
      websocket.connect(
        urls.notification,
        () => setIsConnectedNotifications(true),
        () => setIsConnectedNotifications(false)
      );

      websocket.onMessage((event) => {
        const data: ChatSocketEventData = JSON.parse(event.data);
        console.info("JSON.parse socket dataEvent notification:", data);
      });
    }
  }, [userProfile, accessToken, isLoadingApp]);

  useEffect(() => {
    if (
      userProfile &&
      accessToken &&
      !isLoadingApp &&
      location.pathname.includes(urls.auth.index)
    ) {
      history.push(urls.profile.index);
    }
  }, [userProfile]);

  useEffect(() => {
    if ((!accessToken || !userProfile) && !isLoadingApp) {
      const cleanPath = location.pathname.replace(/\/$/, "");
      if (
        PRIVATE_URLS.includes(cleanPath) ||
        PRIVATE_URLS.find((URL) => cleanPath.includes(URL))
      ) {
        history.push(urls.auth.index + urls.auth.signIn);
      }
    }
  }, [userProfile, accessToken, isLoadingApp, window.location]);

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
  initApp: () => dispatch(initApp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
