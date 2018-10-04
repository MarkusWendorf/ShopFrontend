import {Link} from "react-router-dom";
import {formatPrice, linkToProduct, quantityStatus} from "../../Util/util";
import {StatusText} from "../../Components/Indicator/StatusText";
import {MinusIcon, PlusIcon} from "../../Components/Icons/Icons";
import * as React from "react";
import {CartItem, Product} from "../../Util/model";

interface Props {
    item: CartItem;
    removeOne: (p: Product) => void;
    addOne: (p: Product) => void;
}

const CartItemUi = (props: Props) => {

    const {item, removeOne, addOne} = props;
    const onAddOne = (e: any) => addOne(item.product);
    const onRemoveOne = (e: any) => removeOne(item.product);

    return (
        <li className="cart-item" key={item.product.id}>
            <div className="product-name-quantity" title={item.product.pname}>
                <Link className="product-name" to={linkToProduct(item.product.id)}>{item.product.pname}</Link>
                <div className="availability">
                    <b>Verfügbarkeit: </b>
                    <StatusText status={quantityStatus(item.product.quantity)}/>
                </div>
            </div>
            <div className="product-quantity">
                    <span className="minus" onClick={onRemoveOne}>
                        <MinusIcon/>
                    </span>
                <span className="currentValue">{item.quantity}</span>
                <span className="plus" onClick={onAddOne}>
                        <PlusIcon/>
                    </span>
            </div>
            <div className="product-price">
                {formatPrice(item.product.price)}
            </div>
            <div className="product-total-price">
                {formatPrice(item.product.price * item.quantity)}
            </div>
            <Link className="image-wrapper" to={linkToProduct(item.product.id)}>
                <img src={item.product.imgurl}/>
            </Link>
        </li>
    );
};

export default CartItemUi;
