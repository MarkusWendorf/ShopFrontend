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
                <div className="cart-item">
                    <b className="cart-item__name">Produktname</b>
                    <b className="cart-item__id">Artikelnr.</b>
                    <b className="cart-item__quantity">Anzahl</b>
                    <b className="cart-item__price">Preis</b>
                </div>

                {cartItems.map((c: CartItem) => <Row c={c} key={c.product.id}/>)}

                <div className="cart-item total">
                    <b className="cart-item__name"/>
                    <b className="cart-item__id"/>
                    <b className="cart-item__quantity"/>
                    <b className="cart-item__price">{formattedTotal}</b>
                </div>
            </div>
        );
    }
}

const Row = ({c}: {c: CartItem }) => (
    <div className="cart-item" key={c.product.id}>
        <div className="cart-item__name">{c.product.pname}</div>
        <div className="cart-item__id">{c.product.id}</div>
        <div className="cart-item__quantity">{c.quantity}</div>
        <div className="cart-item__price">{formatPrice(c.product.price * c.quantity)}</div>
    </div>
);

export default CartTable;
