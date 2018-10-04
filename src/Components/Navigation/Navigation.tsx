import * as React from "react";
import {Link} from "react-router-dom";
import "./navigation.scss";
import {CartIcon, CloseIcon, HamburgerIcon, SearchIcon} from "../Icons/Icons";
import SidebarItems from "../Sidebar/SidebarItems";
import {connect} from "react-redux";
import {StoreAuth, StoreCart} from "../../Redux/Store/Store";
import {cartTotal, formatPrice} from "../../Util/util";
import {push} from "react-router-redux";

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

        const totalCart = this.props.cartTotal || 0;

        return (
            <nav>
                <form className={"search-overlay " + (this.state.showSearch ? "" : "hide")} onSubmit={this.search}>
                    <input name="search"/>
                    <span className="close" onClick={this.hideSearch}>
                        <CloseIcon/>
                    </span>
                </form>

                <div className="menu">
                    <span className="menu-icon" onClick={this.toggleMenu}>
                        <HamburgerIcon/>
                    </span>
                    <span className="logo">
                        <Link to={"/"}>
                            Electronix
                        </Link>
                    </span>
                    <span className="search-cart-icons">
                        <span onClick={this.showSearch}>
                            <SearchIcon/>
                        </span>
                        <Link to={"/warenkorb"}>
                            <CartIcon/>
                        </Link>
                    </span>
                </div>

                <div className={"mobile-menu " + (this.state.showMenu ? "show" : "")}>
                    <SidebarItems onPageChange={this.toggleMenu} loggedIn={this.props.isLoggedIn}/>
                </div>

                <ul className="category-list">
                    <Link to={"/hardware/"}>
                        <li>Hardware</li>
                    </Link>
                    <Link to={"/software"}>
                        <li>Neuheiten</li>
                    </Link>
                    <Link to={"/angebote"}>
                        <li>Angebote</li>
                    </Link>
                </ul>

                <span className="flex1"/>
                <div className="shopping-cart-nav">
                    <Link to={"/warenkorb"}>
                        <CartIcon/>
                        <b>{formatPrice(totalCart)}</b>
                    </Link>
                </div>
            </nav>
        );
    }

    private hideSearch = (e: any) => this.setState({showSearch: false});
    private showSearch = (e: any) => this.setState({showSearch: true});
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
