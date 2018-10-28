import * as React from "react";
import * as ReactDOM from "react-dom";
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import throttle from "lodash/throttle";
import rootReducer from "./Redux/Reducers/rootReducer";
import createBrowserHistory from "history/createBrowserHistory";
import {connectRouter, routerMiddleware} from "connected-react-router";
import {persistState, restoreState} from "./Redux/Store/persistState";
import {classToPlainAction} from "./Redux/Store/classToPlainAction";
import Main from "./Main";
import "./main.scss";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createBrowserHistory();
const stateFromStorage = restoreState();
const store = createStore(
    connectRouter(history)(rootReducer),
    stateFromStorage,
    composeEnhancers(applyMiddleware(thunk, classToPlainAction, routerMiddleware(history), logger)),
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
