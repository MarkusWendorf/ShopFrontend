import {Product} from "../../Util/model";

export type ProductAction =
    FetchCategoryRequest
    | FetchCategorySuccessful
    | FetchCategoryFailed
    | FetchProductRequest
    | FetchProductSuccessful
    | FetchProductFailed
    | QueryProductsRequest
    | QueryProductsFailed
    | QueryProductsClear
    | QueryProductsSuccessful
    | FetchCategoryListSuccessful
    | FetchCategoryListFailed;

export enum ProductActions {
    FETCH_CATEGORY_REQUEST = "FETCH_CATEGORY_REQUEST",
    FETCH_CATEGORY_SUCCESSFUL = "FETCH_CATEGORY_SUCCESSFUL",
    FETCH_CATEGORY_FAILED = "FETCH_CATEGORY_FAILED",
    FETCH_PRODUCT_REQUEST = "FETCH_PRODUCT_REQUEST",
    FETCH_PRODUCT_SUCCESSFUL = "FETCH_PRODUCT_SUCCESSFUL",
    FETCH_PRODUCT_FAILED = "FETCH_PRODUCT_FAILED",
    QUERY_PRODUCTS_REQUEST = "QUERY_PRODUCTS_REQUEST",
    QUERY_PRODUCTS_SUCCESSFUL = "QUERY_PRODUCTS_SUCCESSFUL",
    QUERY_PRODUCTS_FAILED = "QUERY_PRODUCTS_FAILED",
    QUERY_PRODUCTS_CLEAR = "QUERY_PRODUCTS_CLEAR",
    FETCH_CATEGORY_LIST_SUCCESSFUL = "FETCH_CATEGORY_LIST_SUCCESSFUL",
    FETCH_CATEGORY_LIST_FAILED = "FETCH_CATEGORY_LIST_FAILED",
}

export class FetchCategoryListSuccessful {
    public readonly type = ProductActions.FETCH_CATEGORY_LIST_SUCCESSFUL;
    constructor(public categories: string[]) {}
}

export class FetchCategoryListFailed {
    public readonly type = ProductActions.FETCH_CATEGORY_LIST_FAILED;
    constructor(public error: string) {}
}

export class FetchCategoryRequest {
    public readonly type = ProductActions.FETCH_CATEGORY_REQUEST;
}

export class FetchCategorySuccessful {
    public readonly type = ProductActions.FETCH_CATEGORY_SUCCESSFUL;

    constructor(public category: string, public products: Product[], public links: object) {
    }
}

export class FetchCategoryFailed {
    public readonly type = ProductActions.FETCH_CATEGORY_FAILED;

    constructor(public error: string) {
    }
}

export class FetchProductRequest {
    public readonly type = ProductActions.FETCH_PRODUCT_REQUEST;
}

export class FetchProductSuccessful {
    public readonly type = ProductActions.FETCH_PRODUCT_SUCCESSFUL;

    constructor(public product: Product) {
    }
}

export class FetchProductFailed {
    public readonly type = ProductActions.FETCH_PRODUCT_FAILED;

    constructor(public error: string) {
    }
}

export class QueryProductsRequest {
    public readonly type = ProductActions.QUERY_PRODUCTS_REQUEST;
}

export class QueryProductsSuccessful {
    public readonly type = ProductActions.QUERY_PRODUCTS_SUCCESSFUL;

    constructor(public products: Product[], public page: number, public isLast: boolean) {
    }
}

export class QueryProductsFailed {
    public readonly type = ProductActions.QUERY_PRODUCTS_FAILED;

    constructor(public  error: string) {
    }
}

export class QueryProductsClear {
    public readonly type = ProductActions.QUERY_PRODUCTS_CLEAR;
}
