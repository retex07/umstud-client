import React, { StrictMode, Suspense } from "react";
import { render } from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { history } from "services/router";
import Store from "store/index";

import App from "./App";

import "./index.scss";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

render(
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
  </StrictMode>,
  document.getElementById("root")
);
