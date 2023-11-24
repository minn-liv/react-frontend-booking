import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import { RouterProvider } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

import "./styles/App.scss";
import reduxStore from "./redux";
import router from "./router";

import InitProviderWrapper from "./hoc/InitProviderWrapper";
import { ContextProvider } from "./contexts/ContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ContextProvider>
        <Provider store={reduxStore}>
            <InitProviderWrapper>
                <RouterProvider router={router} />
            </InitProviderWrapper>
        </Provider>
    </ContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log());
