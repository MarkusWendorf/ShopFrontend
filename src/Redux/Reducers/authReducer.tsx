import {AuthAction, AuthActions} from "../ActionTypes/AuthActions";
import {StoreAuth} from "../Store/Store";

const initialState: StoreAuth = {isFetching: false};

const authReducer = (state: StoreAuth = initialState, action: AuthAction): StoreAuth => {

    switch (action.type) {
        case AuthActions.AUTH_REQUEST:
            return {token: undefined, authError: "", claims: undefined, isFetching: true};
        case AuthActions.REGISTER_SUCCESSFUL:
            return {isFetching: false};
        case AuthActions.LOGIN_SUCCESSFUL:
            return {token: action.token, claims: action.claims, isFetching: false};
        case AuthActions.LOGIN_FAILED:
            return {authError: action.error, isFetching: false};
        case AuthActions.REGISTER_FAILED:
            return {authError: action.error, isFetching: false};
        case AuthActions.LOGOUT:
            return {token: undefined, authError: "", claims: undefined, isFetching: false};
        default:
            return state;
    }
};

export default authReducer;
