import * as React from "react";
import {connect} from "react-redux";
import {Logout} from "../../Redux/ActionTypes/AuthActions";

interface OwnProps {

}

interface StateToPropsType {
}

interface DispatchToPropsType {
    logout: () => void;
}

type Props = StateToPropsType & DispatchToPropsType & OwnProps;

class LogoutPage extends React.Component<Props, {}> {

    public componentDidMount() {
        this.props.logout();
    }

    public render() {

        return (
            <div>
                Sie wurden erfolgreich abgemeldet
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: any): DispatchToPropsType => ({
    logout: () => dispatch(new Logout()),
});

export default connect(null, mapDispatchToProps)(LogoutPage);
