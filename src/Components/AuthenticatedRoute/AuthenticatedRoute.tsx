import * as React from "react";
import {Redirect, RouteProps} from "react-router";
import {StoreAuth, StoreState} from "../../Redux/Store/Store";
import {connect} from "react-redux";

interface OwnProps extends RouteProps {
    component: React.ComponentClass<any>;
}

interface StateToPropsType {
    auth: StoreAuth;
}

type Props = OwnProps & StateToPropsType;

class AuthenticatedRoute extends React.Component<Props, {}> {

    public render() {

        const isAuthenticated = this.props.auth.token;

        if (isAuthenticated) {
            return <this.props.component {...this.props}/>;
        } else {
            return (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: {from: this.props.location},
                    }}
                />
            );
        }
    }
}

const mapStateToProps = (state: StoreState, ownProps: OwnProps): StateToPropsType => ({
    auth: state.auth,
});

export default connect(mapStateToProps, null)(AuthenticatedRoute);
