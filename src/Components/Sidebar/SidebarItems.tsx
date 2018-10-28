import * as React from "react";
import {Link} from "react-router-dom";

interface Props {
    onPageChange?: () => void;
    loggedIn: boolean;
}

const SidebarItems = (props: Props) => (
    <ul className="sidebar-list" onClick={props.onPageChange}>
        <li className="menu-head">
            Menü
        </li>
        {props.loggedIn ?
            <Link to={"/logout"}>
                <li>Abmelden</li>
            </Link>
            :
            <Link to={"/login"}>
                <li>Anmelden</li>
            </Link>
        }
        <Link to={"/konto"}>
            <li>Kundenkonto</li>
        </Link>
        <Link to={"/support"}>
            <li>Hilfe und Service</li>
        </Link>
        <Link to={"/datenschutz"}>
            <li>Datenschutz</li>
        </Link>
        <Link to={"/widerrufsrecht"}>
            <li>Widerrufsrecht</li>
        </Link>
        <Link to={"/impressum"}>
            <li>Impressum</li>
        </Link>
        <Link to={"/zahlungsarten"}>
            <li>Zahlungsarten</li>
        </Link>
        <Link to={"/lieferung"}>
            <li>Versand / Lieferung</li>
        </Link>
        <Link to={"/ruecksendungen"}>
            <li>Rücksendungen</li>
        </Link>

    </ul>
);

export default SidebarItems;
