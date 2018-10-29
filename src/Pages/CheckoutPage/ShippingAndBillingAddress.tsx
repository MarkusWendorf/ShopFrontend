import * as React from "react";
import {Address} from "../../Util/model";
import {ArrowRightIcon} from "../../Components/Icons/Icons";
import ButtonWithIcon from "../../Components/Buttons/ButtonWithIcon";
import "./address-form.scss";
import AddressForm from "./AddressForm";

interface Props {
    addresses: {
        shipping: Address;
        billing: Address;
    };
    onNextStep: (shipping: Address, billing: Address) => any;
}

interface State {
    shipping: Address;
    billing: Address;
    shippingEqualBilling: boolean;
}

class ShippingAndBillingAddress extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            shipping: this.props.addresses.shipping,
            billing: this.props.addresses.billing,
            shippingEqualBilling: true,
        };
    }

    public render() {

        return (
            <div>
                <form onSubmit={this.nextStep} className="address-form">
                    <AddressForm
                        information={this.state.shipping}
                        update={this.updateShipping}
                        heading="Versandadresse:"
                    />

                    {!this.state.shippingEqualBilling &&
                        <AddressForm
                            information={this.state.billing}
                            update={this.updateBilling}
                            heading="Rechnungsadresse:"
                        />
                    }

                    <div>
                        <span>Liefer- und Rechnungsadresse identisch</span>
                        <input
                            type="checkbox"
                            checked={this.state.shippingEqualBilling}
                            onChange={this.setShippingEqualBilling}
                        />
                    </div>

                    <div className="display-flex">

                        <div className="next-step">
                            <ButtonWithIcon
                                icon={ArrowRightIcon}
                                text={"Weiter"}
                                type="submit"
                            />
                        </div>
                    </div>
                </form>

            </div>
        );
    }

    private nextStep = (e: any) => {
        e.preventDefault();

        const billing = this.state.shippingEqualBilling ? this.state.shipping : this.state.billing;
        this.props.onNextStep(this.state.shipping, billing);
    };

    private updateShipping = (key: string, e: any) => {
        this.setState({shipping: {...this.state.shipping, [key]: e.target.value}});
    };

    private updateBilling = (key: string, e: any) => {
        this.setState({billing: {...this.state.billing, [key]: e.target.value}});
    };

    private setShippingEqualBilling = (e: any) => {
        this.setState({shippingEqualBilling: !this.state.shippingEqualBilling});
    };
}

export default ShippingAndBillingAddress;
