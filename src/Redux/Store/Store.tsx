import {
    AddressInformation,
    AutocompleteProduct,
    CartItem,
    JwtClaims,
    Product,
    ProductsByCategory,
    ValidatedCart,
} from "../../Util/model";

export interface StoreState {
    auth: StoreAuth;
    products: StoreProducts;
    cart: StoreCart;
    checkout: StoreCheckout;
    routing: StoreRouting;
}

export interface StoreCheckout {
    currentStep: number;
    cart: ValidatedCart;
    address: AddressInformation;
    orderId: string;
    errorMessage: string;
    isFetching: boolean;
}

export interface StoreAuth {
    token?: string;
    claims?: JwtClaims;
    authError?: string;
    isFetching: boolean;
}

export interface StoreRouting {
    location: Location | null;
}

export interface StoreProducts {
    categoryRequest: ProductsByCategory;
    productRequest: {
        product?: Product;
        errorMessage: string;
        isFetching: boolean;
    };
    queryProductsRequest: {
        products: Product[];
        page: number;
        lastPage: number;
        errorMessage: string;
        isFetching: boolean;
    };
    categoryList: {
        categories: string[];
        errorMessage: string;
    };
    autocomplete: AutocompleteProduct[];
}

export interface StoreCart {
    items: CartItem[];
    validatedByServer: ValidatedCart;
}
