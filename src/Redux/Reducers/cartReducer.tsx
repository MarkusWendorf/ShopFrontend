import {StoreCart} from "../Store/Store";
import {CartAction, CartActions} from "../ActionTypes/CartActions";
import {CartItem, Product} from "../../Util/model";
import {CheckoutAction, CheckoutActions} from "../ActionTypes/CheckoutActions";

const initialState: StoreCart = {
    items: [],
    validatedByServer: {
        items: [],
        isFetching: false,
        errorMessage: "",
        total: 0,
    },
};

const cartReducer = (state: StoreCart = initialState, action: CartAction | CheckoutAction): StoreCart => {

    switch (action.type) {
        case CartActions.ADD_TO_CART:

            const idToAdd = action.product.id;
            const itemsCopy = [...state.items];

            for (const item of itemsCopy) {
                if (item.product.id === idToAdd) {
                    item.quantity += 1;
                    return {...state, items: itemsCopy};
                }
            }

            return {...state, items: [...itemsCopy, {product: action.product, quantity: 1}]};

        case CartActions.REMOVE_FROM_CART:

            const idToRemove = action.product.id;
            const copyItems = [...state.items];

            for (const item of copyItems) {
                if (item.product.id === idToRemove) {
                    item.quantity -= 1;

                    if (item.quantity < 1) {
                        const removed = copyItems.filter((i: CartItem) => i.product.id !== idToRemove);
                        return {...state, items: removed};
                    }

                    return {...state, items: copyItems};
                }
            }

            return state;

        case CartActions.VALIDATE_CART_REQUEST:
            return {...state, validatedByServer: {errorMessage: "", isFetching: true, items: [], total: 0}};

        case CartActions.VALIDATE_CART_FAILED:
            return {...state, validatedByServer: {errorMessage: action.error, isFetching: false, items: [], total: 0}};

        case CartActions.VALIDATE_CART_SUCCESSFUL:
            return {...state, validatedByServer: action.validCart, items: action.validCart.items};

        case CheckoutActions.CHECKOUT_PURCHASE_SUCCESSFUL:
            return {...state, items: [], validatedByServer: {
                errorMessage: "", isFetching: false, items: [], total: 0}};
        default:
            return state;
    }
};

export default cartReducer;
