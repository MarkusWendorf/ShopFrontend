import {Product, ValidatedCart} from "../../Util/model";

export enum CartActions {
    ADD_TO_CART = "ADD_TO_CART",
    REMOVE_FROM_CART = "REMOVE_FROM_CART",
    DISCARD_PRODUCT = "DISCARD_PRODUCT",
    VALIDATE_CART_REQUEST = "VALIDATE_CART_REQUEST",
    VALIDATE_CART_SUCCESSFUL = "VALIDATE_CART_SUCCESSFUL",
    VALIDATE_CART_FAILED = "VALIDATE_CART_FAILED",
}

export type CartAction = AddToCart
    | RemoveFromCart
    | DiscardProduct
    | ValidateCartRequest
    | ValidateCartSuccessful
    | ValidateCartFailed;

export class AddToCart {
    public readonly type = CartActions.ADD_TO_CART;

    constructor(public product: Product) {
    }
}

export class RemoveFromCart {
    public readonly type = CartActions.REMOVE_FROM_CART;

    constructor(public product: Product) {
    }
}

export class DiscardProduct {
    public readonly type = CartActions.DISCARD_PRODUCT;

    constructor(public product: Product) {
    }
}

export class ValidateCartRequest {
    public readonly type = CartActions.VALIDATE_CART_REQUEST;
}

export class ValidateCartSuccessful {
    public readonly type = CartActions.VALIDATE_CART_SUCCESSFUL;

    constructor(public validCart: ValidatedCart) {
    }
}

export class ValidateCartFailed {
    public readonly type = CartActions.VALIDATE_CART_FAILED;

    constructor(public error: string) {
    }
}
