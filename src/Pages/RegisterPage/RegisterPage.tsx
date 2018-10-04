import * as React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {StoreAuth} from "../../Redux/Store/Store";
import {register} from "../../Redux/ActionCreators/Login";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

interface OwnProps {

}

interface StateToPropsType {
    authError?: string;
    isFetching: boolean;
}

interface DispatchToPropsType {
    register: (email: string, password: string) => void;
}

type Props = StateToPropsType & DispatchToPropsType & OwnProps;

interface State {

}

class RegisterPage extends React.Component<Props, State> {

    public render() {

        if (this.props.isFetching) return <LoadingSpinner/>;
        const error = this.props.authError;

        return (
            <div className="login-register-page">
                <div className="login-or-register">
                    <h2>Registrieren</h2>
                    <span>
                        oder&nbsp;
                        <Link to={"/login"} className="register-link">anmelden</Link>
                    </span>
                </div>

                <form id="login-register-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="login-register-email">Email</label>
                    <input id="login-register-email" name="email"/>
                    <label htmlFor="login-register-password">Passwort</label>
                    <input id="login-register-password" type="password" name="password"/>
                    <div className="display-flex">
                        <span className="flex1"/>
                        <button id="login-register-submit" type="submit">Registrieren</button>
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

        this.props.register(email, password);
    }
}

const mapStateToProps = ({auth}: { auth: StoreAuth }, ownProps: OwnProps): StateToPropsType => ({
    authError: auth.authError,
    isFetching: auth.isFetching,
});

const mapDispatchToProps = (dispatch: any): DispatchToPropsType => ({
    register: (email: string, password: string) => dispatch(register(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
