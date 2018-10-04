import * as React from "react";
import "./buttons.scss";

interface Props {
    icon: React.SFC<any>;
    text: string;
    left?: boolean;
}

// make all button html attributes available
type PropsButton = Props & React.HTMLProps<HTMLButtonElement>;

class ButtonWithIcon extends React.PureComponent<PropsButton, {}> {

    public render() {
        const {text, icon, left, ...other} = this.props;

        return (
            <button className="icon-button" {...other}>
                {left && icon({className: "icon"})}
                <span className="text">{text}</span>
                {!left && icon({className: "icon"})}
            </button>
        );
    }

}

export default ButtonWithIcon;
