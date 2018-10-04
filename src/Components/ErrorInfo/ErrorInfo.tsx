import * as React from "react";

interface Props {
    error: string;
}

const ErrorInfo = (props: Props) => (
    <div>
        <h3>Es ist ein Fehler aufgetreten</h3>
        <p>{props.error}</p>
    </div>
);

export default ErrorInfo;
