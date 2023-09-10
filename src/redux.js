import { createBrowserHistory } from "history";
import { createStore } from "redux";

import actionTypes from "./store/actions/actionTypes";
import createRootReducer from "./store/reducers/rootReducer";

export const history = createBrowserHistory({
    basename: process.env.REACT_APP_ROUTER_BASENAME,
});

const rootReducer = createRootReducer(history);

const reduxStore = createStore(rootReducer);

export const dispatch = reduxStore.dispatch;

export default reduxStore;
