import * as React from "react";

interface Props {
    status: number;
}

export const AvailabilityIndicator: React.SFC<Props> = (props: Props) => {
    const status = props.status;
    let statusText = "nicht verfügbar";

    if (status > 1) {
        statusText = status === 2 ? "Bestand gering" : "lieferbar";
    }

    return (
        <div className={"status-" + status}>
            <span className={"status-dot dot-" + status} />
            {statusText}
        </div>
    );
};
