import {StoreProducts} from "../Store/Store";
import {ProductAction, ProductActions} from "../ActionTypes/ProductActions";

const initialState: StoreProducts = {
    productRequest: {
        isFetching: false,
        errorMessage: "",
    },
    categoryRequest: {
        isFetching: false,
        errorMessage: "",
        products: [],
        category: "",
    },
    queryProductsRequest: {
        isFetching: false,
        errorMessage: "",
        products: [],
        page: 1,
        lastPage: 1,
    },
    categoryList: {
        categories: [],
        errorMessage: "",
    },
    autocomplete: [],
};

const productsReducer = (state: StoreProducts = initialState, action: ProductAction): StoreProducts => {

    switch (action.type) {
        case ProductActions.FETCH_CATEGORY_LIST_SUCCESSFUL:
            return {...state, categoryList: {categories: action.categories, errorMessage: ""}};

        case ProductActions.FETCH_CATEGORY_LIST_FAILED:
            return {...state, categoryList: {categories: [], errorMessage: action.error}};

        case ProductActions.FETCH_CATEGORY_REQUEST:
            return {
                ...state, categoryRequest: {
                    isFetching: true, errorMessage: "", products: [], links: undefined, category: "",
                },
            };

        case ProductActions.FETCH_CATEGORY_SUCCESSFUL:

            return {
                ...state,
                categoryRequest: {
                    category: action.category,
                    products: action.products,
                    links: action.links,
                    isFetching: false,
                    errorMessage: "",
                },
            };

        case ProductActions.FETCH_CATEGORY_FAILED:

            return {
                ...state, categoryRequest: {
                    category: "", isFetching: false, products: [],
                    links: undefined, errorMessage: action.error,
                },
            };

        case ProductActions.FETCH_PRODUCT_REQUEST:
            return {...state, productRequest: {product: undefined, errorMessage: "", isFetching: true}};

        case ProductActions.FETCH_PRODUCT_SUCCESSFUL:
            return {...state, productRequest: {product: action.product, errorMessage: "", isFetching: false}};

        case ProductActions.FETCH_PRODUCT_FAILED:
            return {
                ...state, productRequest: {
                    product: undefined, errorMessage: action.error,
                    isFetching: false,
                },
            };

        case ProductActions.QUERY_PRODUCTS_REQUEST:
            return {
                ...state, queryProductsRequest: {
                    products: state.queryProductsRequest.products,
                    page: 1, lastPage: 1, isFetching: true, errorMessage: "",
                },
            };

        case ProductActions.QUERY_PRODUCTS_SUCCESSFUL:

            return {
                ...state, queryProductsRequest: {
                    products: action.products,
                    page: action.page,
                    lastPage: action.lastPage,
                    errorMessage: "",
                    isFetching: false,
                },
            };
        case ProductActions.QUERY_PRODUCTS_FAILED:

            return {
                ...state, queryProductsRequest: {
                    products: state.queryProductsRequest.products,
                    page: state.queryProductsRequest.page,
                    lastPage: 1,
                    errorMessage: action.error,
                    isFetching: false,
                },
            };
        case ProductActions.QUERY_PRODUCTS_CLEAR:

            return {
                ...state, queryProductsRequest: {
                    products: [],
                    page: 1, lastPage: 1,
                    errorMessage: "",
                    isFetching: false,
                },
            };

        case ProductActions.AUTOCOMPLETE_SUCCESSFUL:

            return {...state, autocomplete: action.matches};

        default:
            return state;
    }
};

export default productsReducer;
