import {RouterAction} from "react-router-redux";
import {Dispatch} from "redux";
import {getApi} from "../../Util/util";
import {
    FetchCategoryFailed,
    FetchCategoryListFailed,
    FetchCategoryListSuccessful,
    FetchCategoryRequest,
    FetchCategorySuccessful,
    FetchProductFailed,
    FetchProductRequest,
    FetchProductSuccessful,
    ProductAction,
    QueryProductsClear,
    QueryProductsFailed,
    QueryProductsRequest,
    QueryProductsSuccessful,
} from "../ActionTypes/ProductActions";
import * as queryString from "querystring";

export const fetchCategory = (category: string, page: number, queryStr?: string) => {

    return async (dispatch: Dispatch<ProductAction | RouterAction>) => {

        try {
            dispatch(new FetchCategoryRequest());
            // await sleepDebug(2000);
            const response = await getApi("categories/" + category + "/" + page + (queryStr || ""));

            if (response.status !== 200) {
                dispatch(new FetchCategoryFailed(response.error));
                return;
            }

            dispatch(new FetchCategorySuccessful(category, response.data, response.links));
        } catch (err) {
            dispatch(new FetchCategoryFailed("Die Produkt-Kategorie konnte nicht geladen werden"));
        }
    };
};

export const fetchProduct = (id: string) => {

    return async (dispatch: Dispatch<ProductAction>) => {

        try {
            dispatch(new FetchProductRequest());
            // await sleepDebug(2000);
            const response = await getApi("products/" + id);

            if (response.status !== 200) {
                dispatch(new FetchProductFailed(response.error));
                return;
            }

            dispatch(new FetchProductSuccessful(response.data));

        } catch (err) {
            dispatch(new FetchProductFailed("Das Produkt konnte nicht geladen werden."));
        }
    };
};

export const fetchCategoryList = () => {

    return async (dispatch: Dispatch<ProductAction>) => {

        try {
            const response = await getApi("categories");

            if (response.status !== 200) {
                dispatch(new FetchCategoryListFailed(response.error));
                return;
            }

            dispatch(new FetchCategoryListSuccessful(response.data));
        } catch (err) {
            dispatch(new FetchCategoryListFailed(err.toString()));
        }

    };

};

export const queryProducts = (stringQuery: string) => {

    return async (dispatch: Dispatch<ProductAction>) => {

        try {

            if (!queryString.parse(stringQuery).lastKey) {
                dispatch(new QueryProductsClear());
            }

            dispatch(new QueryProductsRequest());
            const response = await getApi("query?" + stringQuery);

            if (response.status !== 200) {
                dispatch(new QueryProductsFailed(response.error));
                return;
            }

            const page = +response.links.page;
            const isLast = response.links.isLast;
            dispatch(new QueryProductsSuccessful(response.data, page, isLast));

        } catch (err) {
            dispatch(new QueryProductsFailed(err.toString()));
        }
    };
};
