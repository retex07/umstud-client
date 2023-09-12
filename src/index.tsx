import React, { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { history } from "services/router";
import Store from "store/index";
import "./services/localization";
import "./index.scss";

import App from "./App";

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

root.render(
  <StrictMode>
    <Suspense fallback={<>Loading...</>}>
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
