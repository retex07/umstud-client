import PageLoader from "components/loaders/pageLoader";
import React, { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { history } from "services/router";
import Store from "store/index";
import { initializeState } from "store/user/user.slice";

import App from "./App";
import "./services/localization";
import "./index.scss";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

initializeState();

root.render(
  <StrictMode>
    <Suspense fallback={<PageLoader />}>
      <QueryClientProvider client={queryClient}>
        <Provider store={Store}>
          <Router history={history}>
            <App />
          </Router>
        </Provider>
      </QueryClientProvider>
    </Suspense>
  </StrictMode>
);
