import * as React from "react";
import "./indicators.scss";

interface Props {
    status: number;
}

const states: {[key: number]: string} = {0: "auf Lager", 1: "nicht auf Lager", 2: "Bestand gering"};

export const StatusText: React.SFC<Props> = (props: Props) => (
    <span className={"status-text status-" + props.status}>
        {states[props.status]}
    </span>
);
