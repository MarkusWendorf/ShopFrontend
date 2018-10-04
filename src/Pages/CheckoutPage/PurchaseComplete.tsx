import * as React from "react";
import ErrorInfo from "../../Components/ErrorInfo/ErrorInfo";

interface Props {
    orderId: string;
    error: string;
    resetToStep0: () => void;
}

const PurchaseComplete = (props: Props) => {

    const success = (
        <div>
            <h2>Wir haben Ihre Bestellung erhalten</h2>
            <div>
                <b>Bestellnummer: </b>
                <span>{props.orderId}</span>
            </div>
        </div>
    );

    return props.error ? <ErrorInfo error={props.error}/> : success;
};

export default PurchaseComplete;
