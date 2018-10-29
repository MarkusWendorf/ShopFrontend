import {Dispatch} from "redux";
import {getApi} from "../../Util/util";
import {
    AutocompleteSuccessful,
    FetchCategoryListFailed,
    FetchCategoryListSuccessful,
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
import {autocompletePath, categoriesPath, productsPath, searchPath} from "../../Util/config";

export const fetchProduct = (id: string) => {

    return async (dispatch: Dispatch<ProductAction>) => {

        try {
            dispatch(new FetchProductRequest());
            // await sleepDebug(2000);
            const response = await getApi(productsPath + "/" + id);

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
            const response = await getApi(categoriesPath);

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

            dispatch(new QueryProductsRequest());
            const response = await getApi(searchPath + "?" + stringQuery);

            if (response.status !== 200) {
                dispatch(new QueryProductsFailed(response.error));
                return;
            }

            const page = +response.links.page;
            const last = +response.links.last;
            dispatch(new QueryProductsSuccessful(response.data, page, last));

        } catch (err) {
            dispatch(new QueryProductsFailed(err.toString()));
        }
    };
};

export const getAutocomplete = (search: string) => {

    return async (dispatch: Dispatch<ProductAction>) => {

        try {

            // dispatch(new QueryProductsRequest());
            const response = await getApi(autocompletePath + "/" + search);

            if (response.status !== 200) {
                console.log("autocomplete !== 200");
                return;
            }

            dispatch(new AutocompleteSuccessful(response.data));

        } catch (err) {
            console.log("autocomplete err", err);
        }
    };
};
