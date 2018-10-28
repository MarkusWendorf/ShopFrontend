import * as React from "react";
import {connect} from "react-redux";
import SidebarItems from "./SidebarItems";
import {StoreAuth, StoreCart} from "../../Redux/Store/Store";
import "./sidebar.scss";

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
