import {ApiResponse, CartItem} from "./model";
import {API_ROOT, productsPath} from "./config";
import {getToken} from "../index";
import {Logout} from "../Redux/ActionTypes/AuthActions";
import {push} from "react-router-redux";

export const linkToProduct = (id: string) => {
    return productsPath + "/" + id;
};

export const formatPrice = (p: number): string => {
    return ((p / 100).toFixed(2)).replace(".", ",") + "€";
};

export const quantityStatus = (quantity: number): number => {
    if (quantity === 0) return 1;
    return quantity <= 5 ? 2 : 0;
};

export const cartTotal = (cart: CartItem[]) => {
    return cart.reduce((total: number, item: CartItem) => item.product.price * item.quantity + total, 0);
};

export const parseJwtClaims = (token: string): object => {
    const segments = token.split(".");
    return JSON.parse(atob(segments[1]));
};

// add token auth header, and login if token is expired
export const postApi = async (resource: string, body: object): Promise<ApiResponse> => {

    const response = await fetch(API_ROOT + resource, {
        method: "POST",
        body: JSON.stringify(body),
    });

    const json = await response.json();

    return {...json, status: response.status};
};

export const postApiAuth = async (resource: string, body: object, dispatch: any): Promise<ApiResponse> => {

    const token = getToken() || "";

    const response = await fetch(API_ROOT + resource, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {authorization: token},
        credentials: "include",
    });

    const json = await response.json();

    if (response.status === 401 || response.status === 403) {
        // unauthorized, redirect to login page
        dispatch(new Logout());
        dispatch(push("/login"));
    }
    return {...json, status: response.status};
};

export const getApi = async (resource: string): Promise<ApiResponse> => {
    const response = await fetch(API_ROOT + resource);
    const json = await response.json();

    console.log("JSON:", json);
    return {...json, status: response.status};
};

export const removeEmptyValues = (object: { [key: string]: any }): any => {
    const obj = {...object};

    Object.keys(obj).forEach((key: string) => {
        if (!obj[key]) delete obj[key];
    });
    
    return obj;
};

export const sleepDebug = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
