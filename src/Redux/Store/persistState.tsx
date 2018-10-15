import {StoreCart, StoreAuth, StoreState} from "./Store";
import rootReducer from "../Reducers/rootReducer";
import {AnyAction} from "redux";

export const persistState = (state: StoreState) => {

    const {isFetching, ...auth} = state.auth;
    localStorage.setItem("auth", JSON.stringify(auth));
    localStorage.setItem("cart", JSON.stringify(state.cart));

    console.log("persist state");
};

export const restoreState = (): StoreState => {

    const authString = localStorage.getItem("auth");
    const cartString = localStorage.getItem("cart");
    const initialState = getInitialState();

    if (authString && cartString) {
        const auth: StoreAuth = JSON.parse(authString);
        const cart: StoreCart = JSON.parse(cartString);

        return {...initialState, auth, cart};
    }

    return initialState;
};

const getInitialState = (): StoreState => {
    return rootReducer({} as StoreState, {} as AnyAction);
};
