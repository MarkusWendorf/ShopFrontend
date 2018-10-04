import {StoreCart, StoreCheckout} from "../../Redux/Store/Store";
import {connect} from "react-redux";
import * as React from "react";
import {Address, AddressInformation, CartItem, ValidatedCart} from "../../Util/model";
import "./checkout-page.scss";
import {purchase, validateCart} from "../../Redux/ActionCreators/Cart";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import CartOverview from "./CartOverview";
import Overview from "./Overview";
import ShippingAndBillingAddress from "./ShippingAndBillingAddress";
import {CheckoutAddAddresses, CheckoutAddCart, CheckoutResetToStep0} from "../../Redux/ActionTypes/CheckoutActions";
import PurchaseComplete from "./PurchaseComplete";
import {push} from "react-router-redux";

interface OwnProps {

}

interface StateToPropsType {
    validatedCart: ValidatedCart;
    cart: CartItem[];
    currentStep: number;
    checkout: StoreCheckout;
    cartError: string;
}

interface DispatchToPropsType {
    validateCart: (cart: CartItem[], existingId?: string) => void;
    checkoutAddCart: (cart: ValidatedCart) => void;
    checkoutAddAddresses: (shipping: Address, billing: Address) => void;
    resetToStep0: () => void;
    purchase: (cartId: string, address: AddressInformation) => void;
    redirectTo: (path: string) => void;
}

type PropsType = StateToPropsType & DispatchToPropsType & OwnProps;

interface State {

}

class CheckoutPage extends React.Component<PropsType, State> {

    private steps = ["Warenkorb", "Versandadresse", "Übersicht"];

    public componentDidMount() {
        if (this.props.cart.length === 0) {
            this.props.redirectTo("/warenkorb");
        }

        const existingId = this.props.validatedCart.id;
        this.props.validateCart(this.props.cart, existingId);
    }

    public componentWillUnmount() {
        this.props.resetToStep0();
    }

    public render() {

        const {
            checkout, currentStep, validatedCart, checkoutAddAddresses,
            checkoutAddCart, resetToStep0, cartError,
        } = this.props;

        if (validatedCart.isFetching) return <LoadingSpinner/>;

        let stepUi;
        switch (this.props.currentStep) {
            case 1:
                stepUi = (
                    <ShippingAndBillingAddress
                        addresses={checkout.address}
                        onNextStep={checkoutAddAddresses}
                    />
                );
                break;
            case 2:
                stepUi = (
                    <Overview
                        checkout={this.props.checkout}
                        onPurchase={this.completePurchase}
                    />
                );
                break;
            case 3:
                stepUi = (
                    <PurchaseComplete
                        orderId={checkout.orderId}
                        resetToStep0={resetToStep0}
                        error={checkout.errorMessage}
                    />
                );
                break;
            default:
                stepUi = (
                    <CartOverview
                        validCart={validatedCart}
                        onNextStep={checkoutAddCart}
                        error={cartError}
                    />
                );
        }

        return (
            <div>
                {currentStep !== 3 &&
                <ul className="steps">
                    {this.steps.map((step: string, i: number) => (
                        <li
                            className={i === currentStep ? "active" : ""}
                            key={step}
                        >
                            {step}
                        </li>
                    ))}
                </ul>
                }

                {stepUi}
            </div>
        );
    }

    private completePurchase = () => {

        const {address, cart} = this.props.checkout;
        if (!cart.id) {
            // location.reload();
        } else {
            this.props.purchase(cart.id, address);
        }
    }
}

const mapStateToProps = ({cart, checkout}: { cart: StoreCart, checkout: StoreCheckout }, ownProps: OwnProps):
    StateToPropsType => ({
    validatedCart: cart.validatedByServer,
    cartError: cart.validatedByServer.errorMessage,
    cart: cart.items,
    currentStep: checkout.currentStep,
    checkout,
});

const mapDispatchToProps = (dispatch: any): DispatchToPropsType => ({
    validateCart: (cart: CartItem[], existingId?: string) => dispatch(validateCart(cart, existingId)),
    resetToStep0: () => dispatch(new CheckoutResetToStep0()),
    purchase: (cartId: string, address: AddressInformation) => dispatch(purchase(cartId, address)),
    redirectTo: (path: string) => dispatch(push(path)),
    checkoutAddCart: (cart: ValidatedCart) => dispatch(new CheckoutAddCart(cart)),
    checkoutAddAddresses: (shipping: Address, billing: Address) =>
        dispatch(new CheckoutAddAddresses(shipping, billing)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
