import * as React from "react";
import "./indicators.scss";

interface Props {
    path: string[];
}

export const Breadcrumb: React.SFC<Props> = (props: Props) => {
    const breadcrumb = props.path.reduce((prev: any, cur: any) => prev + " / " + cur, "");

    return (
        <div className="breadcrumb">
            {breadcrumb.slice(2)}
        </div>
    );
};
