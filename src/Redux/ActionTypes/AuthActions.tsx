export enum AuthActions {
    LOGIN_SUCCESSFUL = "LOGIN_SUCCESSFUL",
    LOGIN_FAILED = "LOGIN_FAILED",
    AUTH_REQUEST = "AUTH_REQUEST",
    LOGOUT = "LOGOUT",
    REGISTER_SUCCESSFUL = "REGISTER_SUCCESSFUL",
    REGISTER_FAILED = "REGISTER_FAILED",
}

export type AuthAction = LoginSuccessful | LoginFailed | Logout | RegisterSuccessful | RegisterFailed | AuthRequest;

export class AuthRequest {
    public readonly type = AuthActions.AUTH_REQUEST;
}

export class LoginSuccessful {
    public readonly type = AuthActions.LOGIN_SUCCESSFUL;
    constructor(public token: string, public claims: any) {
    }
}

export class LoginFailed {
    public readonly type = AuthActions.LOGIN_FAILED;
    constructor(public error: string) {
    }
}

export class Logout {
    public readonly type = AuthActions.LOGOUT;
}

export class RegisterSuccessful {
    public readonly type = AuthActions.REGISTER_SUCCESSFUL;
}

export class RegisterFailed {
    public readonly type = AuthActions.REGISTER_FAILED;
    constructor(public error: string) {
    }
}
