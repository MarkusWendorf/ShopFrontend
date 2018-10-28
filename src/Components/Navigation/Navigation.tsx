import * as React from "react";
import {Link} from "react-router-dom";
import "./navigation.scss";
import {CartIcon, CloseIcon, HamburgerIcon, SearchIcon} from "../Icons/Icons";
import SidebarItems from "../Sidebar/SidebarItems";
import {connect} from "react-redux";
import {StoreAuth, StoreCart} from "../../Redux/Store/Store";
import {cartTotal, formatPrice} from "../../Util/util";
import {push} from "connected-react-router";
import NavHeader, {NavSubHeader} from "./NavHeader";

interface OwnProps {

}

interface StateToPropsType {
    cartTotal: number;
    isLoggedIn: boolean;
}

interface DispatchToPropsType {
    redirectTo: (path: string) => void;
}

type Props = StateToPropsType & DispatchToPropsType & OwnProps;

interface State {
    showMenu: boolean;
    showSearch: boolean;
}

class Navigation extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            showMenu: false,
            showSearch: false,
        };
    }

    public render() {

        const overlayClass = "search-overlay " + (this.state.showSearch ? "" : "search-overlay--hide");
        const mobileMenuClass = "mobile-menu " + (this.state.showMenu ? "mobile-menu--show" : "");
        const totalCart = this.props.cartTotal || 0;

        return (
            <nav>
                <NavHeader
                    onToggleMenu={this.toggleMenu}
                    onShowSearch={this.showSearch}
                    totalCart={totalCart}
                />

                <NavSubHeader/>

                <form className={overlayClass} onSubmit={this.search}>
                    <input className="search-overlay__input" name="search"/>
                    <span className="search-overlay__close" onClick={this.hideSearch}>
                        <CloseIcon/>
                    </span>
                </form>

                {/* mobile only */}
                <div className={mobileMenuClass}>
                    <SidebarItems onPageChange={this.toggleMenu} loggedIn={this.props.isLoggedIn}/>
                </div>

                <span style={{flex: 1}}/>

                {/* desktop only */}
                <div className="shopping-cart-nav">
                    <Link to={"/warenkorb"}>
                        <CartIcon/>
                        <b>{formatPrice(totalCart)}</b>
                    </Link>
                </div>

            </nav>
        );
    }

    private hideSearch = () => this.setState({showSearch: false});
    private showSearch = () => this.setState({showSearch: true});
    private search = (e: any) => {
        e.preventDefault();

        this.props.redirectTo("/search?name=" + e.target.search.value);
        this.setState({showSearch: false});
    }

    private toggleMenu = () => {
        this.setState({showMenu: !this.state.showMenu});
    }
}

const mapDispatchToProps = (dispatch: any): DispatchToPropsType => ({
    redirectTo: (path: string) => dispatch(push(path)),
});

const mapStateToProps = ({cart, auth}: { cart: StoreCart, auth: StoreAuth }) => ({
    cartTotal: cartTotal(cart.items),
    isLoggedIn: !!auth.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
