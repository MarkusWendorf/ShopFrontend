import * as React from "react";
import {connect} from "react-redux";
import {StoreAuth} from "../../Redux/Store/Store";
import {Link} from "react-router-dom";
import {JwtClaims} from "../../Util/model";

interface OwnProps {

}

interface StateToPropsType {
    token?: string;
    claims?: JwtClaims;
}

interface DispatchToPropsType {

}

type Props = StateToPropsType & DispatchToPropsType & OwnProps;

interface State {

}

class AccountPage extends React.Component<Props, State> {

    public render() {

        if (this.props.token && this.props.claims) return (
            <div><b>Angemeldet als:</b> {this.props.claims.email}</div>
        );

        return (
            <div>
                <p>Sie sind nicht angemeldet.
                    <Link to={"/login"}>Zum Login</Link>
                </p>
            </div>
        );
    }
}

const mapStateToProps = ({auth}: { auth: StoreAuth }, ownProps: OwnProps): StateToPropsType => ({
    token: auth.token,
    claims: auth.claims,
});

const mapDispatchToProps = (dispatch: any): DispatchToPropsType => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
