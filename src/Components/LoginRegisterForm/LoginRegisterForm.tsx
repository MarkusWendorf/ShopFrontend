import * as React from "react";
import "./login-register-form.scss";

interface Props {
    onSubmit: (e: any) => void;
    submitText: string;
}

export default class LoginRegisterForm extends React.Component<Props, {}> {

    public render() {

        return (
            <form id="login-register-form" onSubmit={this.props.onSubmit}>
                <label htmlFor="login-register-email">Email</label>
                <input id="login-register-email" name="email"/>
                <label htmlFor="login-register-password">Passwort</label>
                <input id="login-register-password" type="password" name="password"/>
                <div className="display-flex">
                    <span className="flex1"/>
                    <button id="login-register-submit" type="submit">{this.props.submitText}</button>
                </div>
            </form>
        );
    }

}
