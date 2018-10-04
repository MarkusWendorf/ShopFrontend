import {StoreCheckout} from "../Store/Store";
import {Address} from "../../Util/model";
import {CheckoutAction, CheckoutActions} from "../ActionTypes/CheckoutActions";

export const initialAddress: Address = {
    name: "",
    city: "",
    citycode: "",
    street: "",
};

const initialState: StoreCheckout = {
    currentStep: 0,
    cart: {
        items: [],
        isFetching: false,
        errorMessage: "",
        total: 0,
    },
    address: {
        billing: initialAddress,
        shipping: initialAddress,
    },
    isFetching: false,
    errorMessage: "",
    orderId: "",
};

const checkoutReducer = (state = initialState, action: CheckoutAction): StoreCheckout => {

    switch (action.type) {
        case CheckoutActions.CHECKOUT_ADD_CART:
            return {...state, cart: action.cart, currentStep: 1};

        case CheckoutActions.CHECKOUT_ADD_ADDRESSES:
            return {...state, address: {shipping: action.shipping, billing: action.billing}, currentStep: 2};

        case CheckoutActions.CHECKOUT_RESET_TO_STEP_0:
            return {...state, currentStep: 0};

        case CheckoutActions.CHECKOUT_PURCHASE_REQUEST:
            return {...state, orderId: "", isFetching: true};

        case CheckoutActions.CHECKOUT_PURCHASE_SUCCESSFUL:
            return {...state, currentStep: 3, orderId: action.orderId, isFetching: false};

        case CheckoutActions.CHECKOUT_PURCHASE_FAILED:
            return {...state, currentStep: 3, isFetching: false, errorMessage: action.error};

        default:
            return state;
    }
};

export default checkoutReducer;
