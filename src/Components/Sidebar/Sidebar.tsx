import * as React from "react";
import SidebarItems from "./SidebarItems";
import "./sidebar.scss";
import {connect} from "react-redux";
import {StoreAuth, StoreCart} from "../../Redux/Store/Store";

interface OwnProps {

}

interface StateToPropsType {
    isLoggedIn: boolean;
}

interface DispatchToPropsType {

}

type Props = StateToPropsType & DispatchToPropsType & OwnProps;

class Sidebar extends React.Component<Props, {}> {

    public render() {

        return (
            <aside className="sidebar">
                <SidebarItems loggedIn={this.props.isLoggedIn}/>
            </aside>
        );
    }
}

const mapStateToProps = ({cart, auth}: { cart: StoreCart, auth: StoreAuth }) => ({
    isLoggedIn: !!auth.token,
});

export default connect(mapStateToProps)(Sidebar);
