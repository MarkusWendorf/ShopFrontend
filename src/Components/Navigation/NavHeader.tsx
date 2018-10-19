import * as React from "react";
import {CartIcon, HamburgerIcon, SearchIcon} from "../Icons/Icons";
import {Link} from "react-router-dom";
import "./nav-header.scss";
import {formatPrice} from "../../Util/util";

interface Props {
    onToggleMenu: () => void;
    onShowSearch: () => void;
    totalCart: number;
}

const NavHeader = (props: Props) => (
    <>
        <div className="nav-header">
            <span className="nav-header__icon" onClick={props.onToggleMenu}>
                <HamburgerIcon/>
            </span>

            <span className="nav-header__logo">
                <Link to={"/"}>
                    Electronix
                </Link>
            </span>

            <span className="nav-header__search-cart-icons">

                <span onClick={props.onShowSearch}>
                    <SearchIcon/>
                </span>

                <Link to={"/warenkorb"}>
                    <CartIcon/>
                </Link>

            </span>
        </div>

    </>
);

export const NavSubHeader = () => (
    <ul className="nav-subheader">
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
);

export default NavHeader;
