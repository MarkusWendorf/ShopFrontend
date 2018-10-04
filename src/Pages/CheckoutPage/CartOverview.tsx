import * as React from "react";
import {ArrowRightIcon} from "../../Components/Icons/Icons";
import ButtonWithIcon from "../../Components/Buttons/ButtonWithIcon";
import CartTable from "../../Components/CartTable/CartTable";
import {ValidatedCart} from "../../Util/model";
import ErrorInfo from "../../Components/ErrorInfo/ErrorInfo";

interface Props {
    validCart: ValidatedCart;
    onNextStep: (validCart: ValidatedCart) => void;
    error: string;
}

const CartOverview = (props: Props) => {

    const onNext = (e: any) => props.onNextStep(props.validCart);

    const overview = (
        <div>
            <CartTable cart={props.validCart}/>

            <div className="next-step">
                <ButtonWithIcon
                    icon={ArrowRightIcon}
                    text={"Weiter"}
                    onClick={onNext}
                />
            </div>
        </div>
    );

    return props.error ? <ErrorInfo error={props.error}/> : overview;
};

export default CartOverview;
