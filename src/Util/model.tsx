export interface Product {
    category: string;
    id: string;
    pname: string;
    price: number;
    quantity: number;
    imgurl: string;
    attributes: {
        [key: string]: any;
    };
}

export interface ApiResponse {
    status: number;
    data: any;
    error: string;
    links: {
        [key: string]: any,
    };
}

export interface JwtClaims {
    user_id: string;
    expires: number;
    email: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface Address {
    city: string;
    citycode: string;
    street: string;
    name: string;
}

export interface AddressInformation {
    shipping: Address;
    billing: Address;
}

export interface ValidatedCart {
    items: CartItem[];
    total: number;
    shipping?: number;
    id?: string;
    expires?: string;
    isFetching: boolean;
    errorMessage: string;
}

export interface ProductsByCategory {
    category: string;
    page?: number;
    products: Product[];
    links?: {
        [key: string]: any,
    };
    errorMessage: string;
    isFetching: boolean;
}
