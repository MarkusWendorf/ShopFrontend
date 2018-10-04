import * as React from "react";
import * as ReactDOM from "react-dom";
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import throttle from "lodash/throttle";
import rootReducer from "./Redux/Reducers/rootReducer";
import createBrowserHistory from "history/createBrowserHistory";
import {routerMiddleware} from "react-router-redux";
import "./main.scss";
import {persistState, restoreState} from "./Redux/Store/persistState";
import {classToPlainAction} from "./Redux/Store/classToPlainAction";
import Main from "./Main";

const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);
const stateFromStorage = restoreState();
const store = createStore(
    rootReducer,
    stateFromStorage,
    applyMiddleware(thunk, classToPlainAction, routeMiddleware, logger),
);

export const getToken = () => store.getState().auth.token;

// Limit store persistance to once every second
store.subscribe(throttle(() => {
    persistState(store.getState());
}, 1000));

ReactDOM.render(
    <Main history={history} store={store}/>,
    document.getElementById("root"),
);
