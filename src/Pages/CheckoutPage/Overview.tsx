import * as React from "react";
import {StoreCheckout} from "../../Redux/Store/Store";
import "./overview.scss";
import ButtonWithIcon from "../../Components/Buttons/ButtonWithIcon";
import {FlagIcon, LoadingSpinnerIcon} from "../../Components/Icons/Icons";
import {formatPrice} from "../../Util/util";
import CartTable from "../../Components/CartTable/CartTable";

interface Props {
    checkout: StoreCheckout;
    onPurchase: () => void;
}

const Overview = (props: Props) => {
    const shipping = props.checkout.address.shipping;
    const billing = props.checkout.address.billing;
    const cart = props.checkout.cart;

    const onPurchase = (e: any) => props.onPurchase();

    return (
        <div className="overview-page">

            <div className="addresses">
                <div className="shipping">
                    <h2>Versandadresse:</h2>

                    <div className="address">
                        <div>{shipping.name}</div>
                        <div>{shipping.street}</div>
                        <div>{shipping.city + " " + shipping.citycode}</div>
                    </div>
                </div>

                <div className="billing">
                    <h2>Rechnungsadresse:</h2>

                    <div className="address">
                        <div>{billing.name}</div>
                        <div>{billing.street}</div>
                        <div>{billing.city + " " + billing.citycode}</div>
                    </div>
                </div>
            </div>

            <div className="cart">
                <h2 className="line">Artikel:</h2>

                <div>
                    <CartTable cart={cart}/>
                </div>
            </div>

            <div className="price">
                <h2 className="line">Überblick:</h2>

                <div className="price-overview">
                    <div>
                        <div className="center">
                            <div className="price-tag">Preis inkl. Steuern:</div>
                            <div>{formatPrice(cart.total)}</div>
                        </div>
                    </div>
                    <div>
                        <div className="center">
                            <div className="price-tag">Steuern:</div>
                            <div>{formatPrice(cart.total - (cart.total / 1.19))}</div>
                        </div>
                    </div>
                    <div>
                        <div className="center">
                            <div className="price-tag">Versandkosten:</div>
                            <div>{formatPrice(cart.shipping || 0)}</div>
                        </div>
                    </div>
                </div>

                <div className="complete-order">
                    <h1>{formatPrice(cart.total + (cart.shipping || 0))}</h1>
                    <ButtonWithIcon
                        icon={props.checkout.isFetching ? LoadingSpinnerIcon : FlagIcon}
                        text={"Bestellung abschließen"}
                        onClick={onPurchase}
                    />
                </div>

            </div>

        </div>
    );
};

export default Overview;
