import {Dispatch} from "redux";
import {RouterAction} from "react-router-redux";
import {postApiAuth} from "../../Util/util";
import {AddressInformation, CartItem} from "../../Util/model";
import {CartAction, ValidateCartFailed, ValidateCartRequest, ValidateCartSuccessful} from "../ActionTypes/CartActions";
import {
    CheckoutAction,
    CheckoutPurchaseFailed,
    CheckoutPurchaseRequest,
    CheckoutPurchaseSuccessful,
} from "../ActionTypes/CheckoutActions";

export const validateCart = (cart: CartItem[], existingId?: string) => {

    return async (dispatch: Dispatch<CartAction | RouterAction>) => {

        try {
            dispatch(new ValidateCartRequest());
            const response = await postApiAuth("cart", {items: cart, cart_id: existingId}, dispatch);

            if (response.status !== 200) {
                dispatch(new ValidateCartFailed(response.error));
                return;
            }
            console.log(response.data);
            dispatch(new ValidateCartSuccessful(response.data));

        } catch (err) {
            dispatch(new ValidateCartFailed(err.toString()));
        }
    };
};

export const purchase = (cartId: string, address: AddressInformation) => {

    return async (dispatch: Dispatch<CheckoutAction | RouterAction>) => {

        try {
            dispatch(new CheckoutPurchaseRequest());
            const response = await postApiAuth("order", {cart_id: cartId, address}, dispatch);

            if (response.status !== 200) {
                dispatch(new CheckoutPurchaseFailed(response.error));
                return;
            }

            dispatch(new CheckoutPurchaseSuccessful(response.data));

        } catch (err) {
            dispatch(new CheckoutPurchaseFailed(err.toString()));
        }
    };

};
