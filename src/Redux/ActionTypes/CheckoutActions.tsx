import {Address, ValidatedCart} from "../../Util/model";

export enum CheckoutActions {
    CHECKOUT_ADD_CART = "CHECKOUT_ADD_CART",
    CHECKOUT_ADD_ADDRESSES = "CHECKOUT_ADD_ADDRESSES",
    CHECKOUT_PURCHASE_REQUEST = "CHECKOUT_PURCHASE_REQUEST",
    CHECKOUT_PURCHASE_SUCCESSFUL = "CHECKOUT_PURCHASE_SUCCESSFUL",
    CHECKOUT_PURCHASE_FAILED = "CHECKOUT_PURCHASE_FAILED",
    CHECKOUT_RESET_TO_STEP_0 = "CHECKOUT_RESET_TO_STEP_0",
}

export type CheckoutAction =
    CheckoutAddCart
    | CheckoutAddAddresses
    | CheckoutPurchaseRequest
    | CheckoutPurchaseSuccessful
    | CheckoutPurchaseFailed
    | CheckoutResetToStep0;

export class CheckoutAddCart {
    public readonly type = CheckoutActions.CHECKOUT_ADD_CART;

    constructor(public cart: ValidatedCart) {
    }
}

export class CheckoutAddAddresses {
    public readonly type = CheckoutActions.CHECKOUT_ADD_ADDRESSES;

    constructor(public shipping: Address, public billing: Address) {
    }
}

export class CheckoutPurchaseRequest {
    public readonly type = CheckoutActions.CHECKOUT_PURCHASE_REQUEST;
}

export class CheckoutPurchaseSuccessful {
    public readonly type = CheckoutActions.CHECKOUT_PURCHASE_SUCCESSFUL;

    constructor(public orderId: string) {
    }
}

export class CheckoutPurchaseFailed {
    public readonly type = CheckoutActions.CHECKOUT_PURCHASE_FAILED;

    constructor(public error: string) {
    }
}

export class CheckoutResetToStep0 {
    public readonly type = CheckoutActions.CHECKOUT_RESET_TO_STEP_0;
}
