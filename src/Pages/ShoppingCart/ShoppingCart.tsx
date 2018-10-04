import * as React from "react";
import {CartItem, Product} from "../../Util/model";
import {connect} from "react-redux";
import {StoreCart} from "../../Redux/Store/Store";
import {SignInIcon} from "../../Components/Icons/Icons";
import {cartTotal, formatPrice} from "../../Util/util";
import {AddToCart, RemoveFromCart} from "../../Redux/ActionTypes/CartActions";
import {Link} from "react-router-dom";
import ButtonWithIcon from "../../Components/Buttons/ButtonWithIcon";
import CartItemUi from "./CartItemUi";
import "./shopping-cart.scss";

interface OwnProps {}

interface StateToPropsType {
    cartItems: CartItem[];
}

interface DispatchToPropsType {
    addOne: (p: Product) => void;
    removeOne: (p: Product) => void;
}

type Props = StateToPropsType & DispatchToPropsType & OwnProps;

class ShoppingCart extends React.Component<Props, {}> {

    public render() {

        const cartItems = this.props.cartItems;
        const total = cartTotal(cartItems);
        // call api to get shipping cost?
        const shipping = 599;
        const tax = 19;

        const items = cartItems.map((item: CartItem) => (
            <CartItemUi
                item={item}
                addOne={this.props.addOne}
                removeOne={this.props.removeOne}
            />
        ));

        const cartUi = (
            <div className="shopping-cart">
                <ul>{items}</ul>
                <div className="proceed-to-checkout">
                    <div className="total">{"Gesamt: " + formatPrice(total)}</div>
                    <Link to={"/checkout"}>
                        <ButtonWithIcon icon={SignInIcon} text="zur Kasse"/>
                    </Link>
                </div>
            </div>
        );

        return items.length === 0 ? <h3>Ihr Warenkorb ist leer</h3> : cartUi;
    }
}

const mapStateToProps = ({cart}: { cart: StoreCart }, ownProps: OwnProps): StateToPropsType => ({
    cartItems: cart.items,
});

const mapDispatchToProps = (dispatch: any): DispatchToPropsType => ({
    addOne: (product: Product) => dispatch(new AddToCart(product)),
    removeOne: (product: Product) => dispatch(new RemoveFromCart(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
