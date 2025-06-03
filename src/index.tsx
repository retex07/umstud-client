import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

import { ConfirmProvider } from "@/contexts/confirm/provider";
import { history } from "@/services/router";
import Store from "@/store/index";

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

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={Store}>
        <Router history={history}>
          <ConfirmProvider>
            <App />
          </ConfirmProvider>
        </Router>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
