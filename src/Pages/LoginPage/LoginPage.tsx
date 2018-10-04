import * as React from "react";
import {login} from "../../Redux/ActionCreators/Login";
import {connect} from "react-redux";
import {StoreAuth, StoreRouting} from "../../Redux/Store/Store";
import {Link} from "react-router-dom";
import "./login.scss";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import {Redirect} from "react-router";

interface OwnProps {

}

interface StateToPropsType {
    authError?: string;
    isFetching: boolean;
    token?: string;
}

interface DispatchToPropsType {
    login: (email: string, password: string) => void;
}

type Props = StateToPropsType & DispatchToPropsType & OwnProps;

interface State {

}

class LoginPage extends React.Component<Props, State> {

    public render() {

        if (this.props.token) return <Redirect to={"/konto"}/>;
        if (this.props.isFetching) return <LoadingSpinner/>;
        const error = this.props.authError;

        return (
            <div className="login-register-page">
                <div className="login-or-register">
                    <h2>Anmelden</h2>
                    <span>
                        oder&nbsp;
                        <Link to={"/register"} className="register-link">registrieren</Link>
                    </span>
                </div>

                <form id="login-register-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="login-register-email">Email</label>
                    <input id="login-register-email" type="email" name="email"/>
                    <label htmlFor="login-register-password">Passwort</label>
                    <input id="login-register-password" type="password" name="password"/>
                    <div className="display-flex">
                        <span className="flex1"/>
                        <button id="login-register-submit" type="submit">Anmelden</button>
                    </div>
                </form>
                <p>{error}</p>
            </div>
        );
    }

    private handleSubmit = (e: any) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        this.props.login(email, password);
    }
}

const mapStateToProps = ({auth}: { auth: StoreAuth, routing: StoreRouting }, ownProps: OwnProps): StateToPropsType => ({
    authError: auth.authError,
    isFetching: auth.isFetching,
    token: auth.token,
});

const mapDispatchToProps = (dispatch: any): DispatchToPropsType => ({
    login: (email: string, password: string) => dispatch(login(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
