import * as React from "react";
import "./button-with-icon.scss";

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
            <button className="button--icon" {...other}>
                {left && icon({className: "button--icon__icon"})}
                <span className="button--icon__text">{text}</span>
                {!left && icon({className: "button--icon__icon"})}
            </button>
        );
    }

}

export default ButtonWithIcon;
