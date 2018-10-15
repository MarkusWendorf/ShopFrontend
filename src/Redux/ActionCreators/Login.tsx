import {parseJwtClaims, postApi} from "../../Util/util";
import {
    AuthAction,
    AuthRequest,
    LoginFailed,
    LoginSuccessful,
    RegisterFailed,
    RegisterSuccessful,
} from "../ActionTypes/AuthActions";
import {Dispatch} from "redux";
import {push, RouterAction} from "react-router-redux";
import {loginPath, registerPath} from "../../Util/config";

export const login = (email: string, password: string) => {

    return async (dispatch: Dispatch<AuthAction | RouterAction>) => {

        try {
            dispatch(new AuthRequest());
            const body = {email, password};
            const response = await postApi(loginPath, body);

            if (response.status !== 200) {
                dispatch(new LoginFailed(response.error));
                return;
            }

            const data = response.data;
            const claims = parseJwtClaims(data.token);

            dispatch(new LoginSuccessful(data.token, claims));
            dispatch(push("/warenkorb"));

        } catch (err) {
            dispatch(new LoginFailed(err.toString()));
        }
    };
};

export const register = (email: string, password: string) => {

    return async (dispatch: Dispatch<AuthAction | RouterAction>) => {

        try {
            dispatch(new AuthRequest());
            const body = {email, password};
            const response = await postApi(registerPath, body);

            if (response.status !== 200) {
                dispatch(new RegisterFailed(response.error));
                return;
            }

            dispatch(new RegisterSuccessful());
            dispatch(push("/login"));

        } catch (err) {
            dispatch(new RegisterFailed(err.toString()));
        }
    };
};
