import * as React from "react";
import {formatPrice} from "../../Util/util";
import {CartItem, ValidatedCart} from "../../Util/model";
import "./cart-table.scss";

interface Props {
    cart: ValidatedCart;
}

class CartTable extends React.PureComponent<Props, {}> {

    public render() {

        const formattedTotal = formatPrice(this.props.cart.total);
        const cartItems = this.props.cart.items;

        return (
            <div className="cart-table">
                <div className="item">
                    <b className="name">Produktname</b>
                    {/*<b className="id">Artikelnr.</b>*/}
                    <b className="quantity">Anzahl</b>
                    <b className="price">Preis</b>
                </div>

                {cartItems.map((c: CartItem) => (
                    <div className="item" key={c.product.id}>
                        <div className="name">{c.product.pname}</div>
                        {/*<div className="id">{c.product.id}</div>*/}
                        <div className="quantity">{c.quantity}</div>
                        <div className="price">{formatPrice(c.product.price * c.quantity)}</div>
                    </div>
                ))}

                <div className="item total">
                    <b className="name"/>
                    {/*<b className="id"/>*/}
                    <b className="quantity"/>
                    <b className="price">{formattedTotal}</b>
                </div>
            </div>
        );
    }
}

export default CartTable;
