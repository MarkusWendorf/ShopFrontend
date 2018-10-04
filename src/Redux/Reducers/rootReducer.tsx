import {combineReducers, Reducer} from "redux";
import authReducer from "./authReducer";
import productsReducer from "./productsReducer";
import cartReducer from "./cartReducer";
import {StoreState} from "../Store/Store";
import routerReducer from "./routingReducer";
import checkoutReducer from "./checkoutReducer";

export default combineReducers<StoreState>({
    cart: cartReducer,
    auth: authReducer,
    products: productsReducer,
    routing: routerReducer,
    checkout: checkoutReducer,
});
